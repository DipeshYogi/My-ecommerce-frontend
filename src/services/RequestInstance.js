import axios from 'axios';
import {store} from '../store.js';
import {LOGOUT} from '../actions/types';

// const BASE_URL = 'http://127.0.0.1:8000/';
const BASE_URL = 'https://bonoapebackend.herokuapp.com/';
const {dispatch} = store;

const requestInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
})

requestInstance.interceptors.response.use(
    (response) => {
        return response
    },
    async function(error){
        const originalRequest = error.config
        
        if(error.response.status === 401 &&
           originalRequest.url === BASE_URL + 'accounts/token/refresh'){
               window.location.href = '/login/'
           }
        
        if(error.response.status === 401 &&
           error.response.data.code === 'token_not_valid' &&
           error.response.statusText ==='Unauthorized'){
               const refreshToken = localStorage.getItem('refresh_token');

               if(refreshToken){
                const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
                const now = Math.ceil(Date.now() / 1000);
                console.log(tokenParts.exp);
                if (tokenParts.exp > now) {
					return requestInstance
						.post('accounts/token/refresh/', { refresh: refreshToken })
						.then((response) => {
							localStorage.setItem('access_token', response.data.access);
							localStorage.setItem('refresh_token', response.data.refresh);

							requestInstance.defaults.headers['Authorization'] =
								'Bearer ' + response.data.access;
							originalRequest.headers['Authorization'] =
								'Bearer ' + response.data.access;

							return requestInstance(originalRequest);
						})
						.catch((err) => {
							console.log(err);
						});
               }else{
                console.log('Refresh token is expired', tokenParts.exp, now);
                dispatch({type:LOGOUT})
            }
           }else {
            console.log('Refresh token not available.');
            window.location.href = '/login/';
        }}
        return Promise.reject(error);
    }
)

export default requestInstance;