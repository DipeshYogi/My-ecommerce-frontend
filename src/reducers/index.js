import { combineReducers } from 'redux';
import shopReducer from './shopReducer';
import authReducer from './authReducer';
import messageReducer from './messageReducer';
import searchReducer from './searchReducer';
import profileReducer from './profileReducer';
import orderReducer from './orderReducer';

export default combineReducers({
    shopReducer, authReducer, messageReducer, searchReducer, profileReducer,
    orderReducer
}); 