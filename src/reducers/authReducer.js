import { REGISTER, LOGOUT, LOGIN, GET_CURRENT_ADDRESS, UPDATE_PROFILE,
         initialEmptyResult } from '../actions/types.js';
import reducerHelper from './reducerHelper';

const initialState = {
    isAuthenticated: false,
    userdata:initialEmptyResult,
    currAddr:{}
}

const AuthReducer = (state=initialState, action) =>{
  switch(action.type){
    case REGISTER:
      return{
            ...state, 
            isAuthenticated: action.status==='SUCCESS'? true: false, 
            userdata: reducerHelper.handleRequestData(action)
            }
    
    case LOGIN:
      return{
        ...state,
        isAuthenticated: action.status==='SUCCESS'? true: false, 
        userdata: reducerHelper.handleRequestData(action)
      }
    
    case LOGOUT:
      return{
          ...initialState
      }
    
    case UPDATE_PROFILE:
      return{
        ...state,
        userdata: action.status ==='SUCCESS'? reducerHelper.handleRequestData(action): state.userdata
      }
    
    case GET_CURRENT_ADDRESS:
      return{
          ...state,
          currAddr: action.payload
      }
    
    default:
      return state
  }
}

export default AuthReducer;