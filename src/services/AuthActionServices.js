import { STARTING, SUCCESS, FAILURE } from '../actions/types';
import requestInstance from './RequestInstance';
import { createMessage } from '../actions/messages.js';


export const doPostRequest = (url, actionType, formData, msg, authToken) => (dispatch) =>{
  return(
    dispatch({type:actionType, status:STARTING, response:undefined}),
    requestInstance.post(url, formData)
      .then(res =>{
        if(res.data.access){
          localStorage.setItem('access_token',res.data.access)
          localStorage.setItem('refresh_token',res.data.refresh)
        }

        dispatch({type:actionType, status:SUCCESS, response:res.data})
        if(msg) {
          dispatch(createMessage({successMsg:msg.successMsg}))
        }
      }) 
      .catch(err => {
        dispatch({type:actionType, status:FAILURE, response:err})
        if(msg) {
          dispatch(createMessage({failureMsg:msg.failureMsg}))
        }
      })
  )
}