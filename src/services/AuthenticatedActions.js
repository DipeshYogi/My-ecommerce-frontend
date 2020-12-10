import { STARTING, SUCCESS, FAILURE } from '../actions/types';
import requestInstance from './RequestInstance';
import { createMessage } from '../actions/messages.js';

export const doGetRequest = (url, actionType, msg) => (dispatch) =>{
  let auth_token = localStorage.getItem('access_token')
  if(auth_token){
    requestInstance.defaults.headers['Authorization'] = 'Bearer ' + auth_token;
  }
  return(
    dispatch({type: actionType, status: STARTING, response:undefined}),
    requestInstance.get(url)
      .then(res => dispatch({type: actionType, status: SUCCESS, response: res.data}))
      .catch(err => dispatch({type: actionType, status: FAILURE, response: err}))
  ) 
}

export const doPostRequest = (url, actionType, formData, msg) => (dispatch) =>{
  let auth_token = localStorage.getItem('access_token')
  if(auth_token){
    requestInstance.defaults.headers['Authorization'] = 'Bearer ' + auth_token;
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

export const doPutRequest = (url, actionType, formData, msg, payload) => (dispatch) =>{
  let auth_token = localStorage.getItem('access_token')
  if(auth_token){
    requestInstance.defaults.headers['Authorization'] = 'Bearer ' + auth_token;
  }

  return(
    dispatch({type:actionType, status:STARTING, response:undefined}),
    requestInstance.put(url, formData)
      .then(res =>{
        dispatch({type:actionType, status:SUCCESS, response:res.data, payload:payload})
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