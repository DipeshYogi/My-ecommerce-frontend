import React from 'react';
import { useHistory } from 'react-router-dom';
import './OrderConfirm.css';
import {Button, makeStyles, CircularProgress} from '@material-ui/core';
import {connect} from 'react-redux';

const OrderConfirm = ({orderdata}) =>{
  const classes = useStyles()
  const history = useHistory()

  if(orderdata.isLoading){ 
    return(
    <div className="orderconfirm">
    <CircularProgress />
    <p>Confirming Order</p>
    </div> )
  }else{
    return(
    <div className="orderconfirm">
      <h1>Order Placed Successfully</h1>
      <img src={require('../../../assets/order_success.jpg')} height={200} />
      <div className="orderconfirm__btn">
        <Button 
          type='outlined'
          className={classes.btnStyle}
          onClick={()=>history.push('/')}>Home</Button>
        <Button 
          type='outlined'
          className={classes.btnStyle}
          onClick={()=> history.push('/my-orders')}>Order Page</Button>        
      </div>
    </div>
  )}
}

const useStyles = makeStyles({
  btnStyle:{
    fontSize:12,
    backgroundColor:'#D2452D',
    color: '#FFFF',
    fontFamily:'Sora',
    '&:hover':{
      backgroundColor:'#D2452D'
    }
  }
})

const mapStateToProps = (state) => ({
  orderdata: state.orderReducer.order
})

export default connect(mapStateToProps)(OrderConfirm);
