import { GET_SHOP_CAT, GET_SHOP_BY_CAT, CLEAR_SHOPS, GET_SHOP_ITEMS, CURRENT_CAT,
         STORE_SHOP_INFO, GET_TOP_DEALS, GET_TOP_SHOPS } from './types';
import { doGetRequest, doPostRequest } from '../services/ActionServices';

export const getShopCat = () => dispatch => {
  let url = 'shopkeeper/categories/'
  dispatch(doGetRequest(url, GET_SHOP_CAT));
}

export const getShopByCat = (name) => dispatch => {
  var formData = new FormData()
  formData.append("cat_name", name)
  let url = 'shopkeeper/categories/shops/';
  console.log(name)
  dispatch(doPostRequest(url, GET_SHOP_BY_CAT, formData))
  dispatch({type: CURRENT_CAT, payload: name})
}

export const clearSelectedShops = () => {
  return{
      type: CLEAR_SHOPS,
  }
}

export const getShopItems = (id, shop_name) => dispatch => {
  let url = 'shopkeeper/shop-profile/shop-items/'+ id + '/';

  dispatch(doGetRequest(url, GET_SHOP_ITEMS))
  dispatch({type:STORE_SHOP_INFO, payload:{id:id, name:shop_name}})
}

export const getTopDeals = () => dispatch =>{
  let url = 'shopkeeper/top-deals/'
  dispatch(doGetRequest(url, GET_TOP_DEALS))
}

export const getTopShops = () => dispatch =>{
  let url = 'shopkeeper/top-shops/'
  dispatch(doGetRequest(url, GET_TOP_SHOPS))
}