import {GET_ADDRESSES, ADD_ADDRESS, DELETE_ADDRESS, UPDATE_ADDRESS, UPD_ACTIVE_ADDR,
        initialEmptyResult} from '../actions/types';
import reducerHelper from './reducerHelper';


const initialState = {
  addresses: initialEmptyResult,
  addr : []
}

const profileReducer = (state=initialState, action) =>{
  switch(action.type){
    case GET_ADDRESSES:
      return{
        ...state,
        addresses: reducerHelper.handleRequestData(action),
        addr: reducerHelper.handleRequestData(action).data
      }
    case ADD_ADDRESS:
      return{
        ...state,
        addr: action.status === 'SUCCESS'? [...state.addr, reducerHelper.handleRequestData(action).data]
                                         : state.addr                                        
      }
    case UPDATE_ADDRESS:
      let upd_add = []  
      if(action.payload){
        let upd = action.payload;
        upd_add = state.addr.filter((add)=> add.id !== upd.id)
        upd_add.push(upd)
        }
      return{
        ...state,
        addr: action.payload && action.status === 'SUCCESS' ? upd_add : state.addr 
      }
    case DELETE_ADDRESS:
      let upd_addr = []
      if(action.payload){
        let del = action.payload;
        upd_addr = state.addr.filter((add) => 
                        add.address1 !== del.add1 && add.address2 !== del.add2 &&
                        add.pincode !== del.pin && add.phone !== del.phone);
      }
      return{
        ...state,
        addr: action.payload? upd_addr : state.addr
      }
    case UPD_ACTIVE_ADDR:
      let addresses = []
      if(action.status === 'SUCCESS'){
        let id = action.payload
        addresses = state.addr.filter(a => a.id !== id && a.is_active !== true)
        
        //firstly set current active address as inactive
        let curr_act = state.addr.filter(a => a.is_active === true)[0]
        if(curr_act){
          curr_act['is_active'] = false 
          addresses.push(curr_act)
        }        

        //secondly set new active address
        let new_act = state.addr.filter(a => a.id === id)[0]
        new_act['is_active'] = true       
        
        addresses.push(new_act)
      }     
      return{
        ...state,
        addr: action.payload ? addresses : state.addr
      }
         
    default:
      return state;
  }
}

export default profileReducer;