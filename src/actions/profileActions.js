import { GET_CURRENT_ADDRESS, UPDATE_PROFILE, GET_ADDRESSES,
         ADD_ADDRESS, DELETE_ADDRESS, UPDATE_ADDRESS, UPD_ACTIVE_ADDR } from './types';
import {doGetRequest, doPostRequest, doPutRequest} from '../services/AuthenticatedActions';
import axios from 'axios';

export const getLocationFromCoordinates = (latitude, longitude) => dispatch => {
    axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`)
        .then(res => {
            const country = res.data.countryName
            const locality = res.data.locality
            const state = res.data.principalSubdivision
            dispatch({
                type: GET_CURRENT_ADDRESS,
                payload: {country, locality, state}
            })
        }).catch(err => {
                console.log(err)
        })
}

export const updateUserInfo = (id, name, email, phone, dob) => dispatch =>{
    var formdata = new FormData()
    formdata.append("name", name)
    formdata.append("email", email)
    formdata.append("phone", phone)
    formdata.append("date_of_birth", dob.getDate()+"/"+(dob.getMonth()+1)+"/"+dob.getFullYear())
    console.log(id)
    console.log(name)
    console.log(email)
    console.log(dob.getDate()+"/"+(dob.getMonth()+1)+"/"+dob.getFullYear())
    let url = 'accounts/update/' + id +'/';
    let msg = {successMsg:'Profile Updated', failureMsg:'Could not update'}
    dispatch(doPutRequest(url, UPDATE_PROFILE, formdata, msg))
}

export const getUserAddresses = (id) => dispatch =>{
    let url = 'customer/address/'+ id + '/';
    dispatch(doGetRequest(url, GET_ADDRESSES))
}

export const addUserAddress = (add1, add2, pin, phone) => dispatch =>{
    let url = 'customer/address/add/';
    let formData = new FormData();
    formData.append('address1', add1)
    formData.append('address2', add2)
    formData.append('pincode', pin)
    formData.append('phone', phone)
    let msg = {successMsg:'Address added', failureMsg:'Could not add'}

    dispatch(doPostRequest(url, ADD_ADDRESS, formData, msg));

}

export const deleteUserAddress = (add1, add2, pin, phone) => dispatch =>{
    let url = 'customer/address/delete/';
    let formData = new FormData();
    formData.append('address1', add1)
    formData.append('address2', add2)
    formData.append('pincode', pin)
    formData.append('phone', phone)
    let msg = {successMsg:'Deleted', failureMsg:'Could not delete'};

    dispatch(doPostRequest(url, DELETE_ADDRESS, formData, msg));
    dispatch({
              type: DELETE_ADDRESS,
              payload:{'add1':add1, 'add2':add2, 'pin':pin, 'phone':phone }})

}

export const updateUserAddress = (id, addr1, addr2, pin, phone, is_active) => dispatch => {
    let url = 'customer/address/update/'+id+'/';
    let msg = {successMsg:'Updated', failureMsg:'Could not update'}
    let payload = {'id':id, 'address1':addr1, 'address2':addr2, 'pincode':pin, 
                   'phone':phone, 'is_active':is_active }
    let formData = new FormData();
    formData.append('address1', addr1)
    formData.append('address2', addr2)
    formData.append('pincode', pin)
    formData.append('phone', phone)
    formData.append('is_active', is_active)

    dispatch(doPutRequest(url, UPDATE_ADDRESS, formData, msg, payload))        
}

export const updateActiveAddress = (id) => dispatch =>{
    let url = 'customer/address/update/active/'+id+'/';
    let payload = id;
    let formData = undefined;
    let msg = undefined;
    dispatch(doPutRequest(url, UPD_ACTIVE_ADDR, formData, msg, payload))
    // dispatch({
    //     type:UPD_ACTIVE_ADDR,
    //     payload: id
    // })
}
