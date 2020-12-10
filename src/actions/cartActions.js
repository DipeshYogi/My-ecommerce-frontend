import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, CLEAR_CURRENT_CART } from './types.js';

export const addToCart = (id, name, price, discount) => {
return{
      type: ADD_ITEM_TO_CART,
      payload: {id, name, price, discount}
}    
}

export const removeFromCart = (id) => {
    return{
            type: REMOVE_ITEM_FROM_CART,
            payload: id
    }
}

export const clearCart = () => {
    return{
            type: CLEAR_CURRENT_CART
    }
}