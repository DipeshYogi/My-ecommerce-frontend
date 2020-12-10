import { REGISTER, LOGOUT, LOGIN } from './types.js';
import axios from 'axios';
import { createMessage } from './messages.js';
import { doPostRequest} from '../services/AuthActionServices';

export const registerUser = ( {access, email, phno, username, pass1} )=> dispatch =>{
    var formData = new FormData()
    formData.append("access", access)
    formData.append("email", email)
    formData.append("mobile", phno)
    formData.append("name", username)
    formData.append("password", pass1)
    formData.append("langKey", "en")

    let msg = {successMsg:'Registered Sucessfully', failureMsg:'Could not register'}
    let url = "api/user"
    dispatch(doPostRequest(url, REGISTER, formData, msg))
} 

export const loginUser = (email, password) => dispatch =>{
    var formData = new FormData();
    formData.append('email', email)
    formData.append('password', password)
    let msg = {successMsg:'Logged In', failureMsg:'Could not login'}
    let url = "accounts/token/"

    dispatch(doPostRequest(url, LOGIN, formData, msg))
}

export const logoutAction = () =>{
    return{
        type: LOGOUT
    }
}

