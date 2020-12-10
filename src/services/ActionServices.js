import { STARTING, SUCCESS, FAILURE } from '../actions/types';
import requestInstance from './RequestInstance';
import { createMessage } from '../actions/messages.js';

export const doGetRequest = (url, actionType, authToken) => (dispatch) =>{
  if(authToken){
    requestInstance.defaults.headers.common['x-auth-token'] = `Bonoape ${authToken} Hubete`;
  }

  return(
    dispatch({type: actionType, status: STARTING, response:undefined}),
    requestInstance.get(url)
      .then(res => dispatch({type: actionType, status: SUCCESS, response: res.data}))
      .catch(err => dispatch({type: actionType, status: FAILURE, response: err}))
  ) 
}

export const doPostRequest = (url, actionType, formData, msg, authToken) => (dispatch) =>{
  if(authToken) {
    requestInstance.defaults.headers.common['x-auth-token'] = `Bonoape ${authToken} Hubete`;
  }
  return(
    dispatch({type:actionType, status:STARTING, response:undefined}),
    requestInstance.post(url, formData)
      .then(res =>{
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