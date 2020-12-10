import {CREATE_MESSAGE, GET_ERRORS} from '../actions/types';

const initialState = {
    msg: {},
    status: null
}

const messageReducer = (state=initialState, actions) => {
    switch(actions.type){
        case CREATE_MESSAGE:
            return{
                msg: actions.payload
            }
        
        default:
            return state
    }
}

export default messageReducer;