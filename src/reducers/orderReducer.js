import {CREATE_ORDER, GET_USER_ORDERS, LOGOUT, initialEmptyResult} from '../actions/types';
import reducerHelper from './reducerHelper';

const initialState={
  order: initialEmptyResult,
  userorders: initialEmptyResult
}

const orderReducer = (state=initialState, action) =>{
  switch(action.type){
    case CREATE_ORDER:
      return{
        ...state,
        order: reducerHelper.handleRequestData(action)
      }
    
    case GET_USER_ORDERS:
      console.log(action)
      return{
        ...state,
        userorders: action.status === 'SUCCESS' ? reducerHelper.handleRequestData(action) : state.userorders
      }
    
    case LOGOUT:
      return{
          ...initialState
      }
    
    default:
      return state
  }
}

export default orderReducer;