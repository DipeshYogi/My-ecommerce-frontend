//Auth actions
export const REGISTER = 'REGISTER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

//User profile actions
export const ADD_ADDRESS = 'ADD_ADDRESS'; //add delivery address
export const GET_CURRENT_ADDRESS = 'GET_CURRENT_ADDRESS'; //get current address
export const GET_ADDRESSES = 'GET_ADDRESSES'; //get all addresses
export const DELETE_ADDRESS = 'DELETE_ADDRESS'; //delete address
export const UPDATE_ADDRESS = 'UPDATE_ADDRESS'; //update address
export const UPDATE_PROFILE = 'UPDATE_PROFILE'; //update profile
export const UPD_ACTIVE_ADDR = 'UPD_ACTIVE_ADDR'; //update active address

//Shop actions
export const GET_SHOP_CAT = 'GET_SHOP_CAT'; //Get all the shop categories
export const GET_SHOP_BY_CAT = 'GET_SHOP_BY_CAT'; //Get shops by category
export const CURRENT_CAT = 'CURRENT_CAT'; //Store current category
export const CLEAR_SHOPS = 'CLEAR_SHOPS'; //Clear current selected shops
export const GET_SHOP_ITEMS = 'GET_SHOP_ITEMS'; //Get shops items
export const STORE_SHOP_INFO = 'STORE_SHOP_INFO'; //Store selected shop info
export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'; //Add an item to cart
export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'; //Remove item from cart
export const CLEAR_CURRENT_CART = 'CLEAR_CURRENT_CART'; //Clear current cart content
export const FILTER_SHOPS = 'FILTER_SHOPS'; // Filter applied to shop list

//Cart actions
export const ADD_TO_CART = 'ADD_TO_CART';
export const GET_NUMBERS_BASKET = 'GET_NUMBERS_BASKET';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const CLEAR_PRODUCT = 'CLEAR_PRODUCT';

//Order actions
export const CREATE_ORDER = 'CREATE_ORDER';
export const GET_USER_ORDERS = 'GET_USER_ORDERS';

//Error Alerts actions
export const CREATE_MESSAGE = 'CREATE_MESSAGE';
export const GET_ERRORS = 'GET_ERRORS';

//Search actions
export const GET_SIMILARITY_SCORE = 'GET_SIMILARITY_SCORE';

//Status
export const SUCCESS = "SUCCESS";
export const INITIAL = "INITIAL";
export const FAILURE = "FAILURE";
export const STARTING = "STARTING";
export const RETURN_NO_DATA = "RETURN_NO_DATA";

export const initialEmptyResult = {
    data: [],
    error: '',
    isLoading: false,
    status: INITIAL
};