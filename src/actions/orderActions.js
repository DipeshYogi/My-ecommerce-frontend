import {CREATE_ORDER, GET_USER_ORDERS} from './types';
import {doGetRequest, doPostRequest, doPutRequest} from '../services/AuthenticatedActions';

export const createOrder = (cust, shop, items) => dispatch =>{
  let formData = {
    "HCUST": cust,
    "HSHOP": shop,
    "HPROD": items
  }
  let msg = {successMsg:'Order Placed', failureMsg:'Could not place the Order'}
  let url = 'order/create/';

  dispatch(doPostRequest(url, CREATE_ORDER, formData, msg))
}

export const getUserOrders = () => dispatch =>{
  let url = 'order/my-orders/';
  dispatch(doGetRequest(url, GET_USER_ORDERS))
}