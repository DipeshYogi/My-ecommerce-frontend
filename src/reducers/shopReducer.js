import { GET_SHOP_CAT, GET_SHOP_BY_CAT, CLEAR_SHOPS, GET_SHOP_ITEMS,
         ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, CLEAR_CURRENT_CART,
         CURRENT_CAT, STORE_SHOP_INFO, initialEmptyResult } from '../actions/types.js';
import reducerHelper from './reducerHelper';

const initialState = {
    shopCats : initialEmptyResult,
    selectedCat: '',
    selectedShops: initialEmptyResult, //selected shops for shop by category
    selectedShopItems: initialEmptyResult, //items for the selected shops
    selectedShopName: [], //name of the selected shop
    selectedShopUserId: [],
    cartShopName: [],
    cartShopUserId:[], //shopuserid for current shop cart
    addedItems: [], //item added to cart
}

const ShopReducer = (state=initialState, action) => {
    switch(action.type){
        case GET_SHOP_CAT:
            return {
                ...state,
                shopCats: reducerHelper.handleRequestData(action)
            }
        case GET_SHOP_BY_CAT:
            return {
                ...state,
                selectedShops: reducerHelper.handleRequestData(action)
            }  
        case CURRENT_CAT:
            return{
                ...state,
                selectedCat: action.payload
            }
        case CLEAR_SHOPS:
            return {
                ...state,
                selectedShops: initialEmptyResult,
                selectedCat: ''   
            }        
        case GET_SHOP_ITEMS:
            return {
                ...state,
                selectedShopItems: reducerHelper.handleRequestData(action)
            } 
        case STORE_SHOP_INFO:
            return {
                ...state,
                selectedShopName: action.payload.name,
                selectedShopUserId: action.payload.id
            }
        case ADD_ITEM_TO_CART:
            let existingItem = state.addedItems.find(item => item.id === action.payload.id)

            if(existingItem){
                return { 
                    ...state, 
                    addedItems : state.addedItems.map(
                        (item) => item.id === action.payload.id 
                                ? {...item, quantity: item.quantity+1}
                                : item
                    )
                    }
            }else{
                let addedItem = {}
                addedItem.id = action.payload.id
                addedItem.name = action.payload.name
                addedItem.price = parseInt(action.payload.price)
                addedItem.quantity = 1
                addedItem.discount = parseInt(action.payload.discount)

                return{
                    ...state,
                    addedItems: [...state.addedItems, addedItem],
                    cartShopUserId: state.selectedShopUserId,
                    cartShopName: state.selectedShopName
                }
            }

        case REMOVE_ITEM_FROM_CART:
            let existingItem1 = state.addedItems.find(item => item.id === action.payload)
            if(existingItem1.quantity > 1){
                    return{
                        ...state,
                        addedItems: state.addedItems.map(
                            item => item.id === action.payload ? {...item, quantity: item.quantity-1}:item
                        )
                    }
            }else{
                return{
                    ...state,
                    addedItems: state.addedItems.filter(item => item.id !== action.payload) 
                }
            }

        case CLEAR_CURRENT_CART:
            return {
                ...state,
                cartShopName: [],
                cartShopUserId:[], 
                addedItems: []             
            } 
        
        default:
            return state
    }

}

export default ShopReducer;