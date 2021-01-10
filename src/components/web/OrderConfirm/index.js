import React, {useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import './OrderConfirm.css';
import {Button, makeStyles, CircularProgress} from '@material-ui/core';
import {connect} from 'react-redux';
import {clearCart} from '../../../actions/cartActions';

const OrderConfirm = ({orderdata, clearCart}) =>{
  const classes = useStyles()
  const history = useHistory()

  useEffect(() =>{
    if(orderdata.status === 'SUCCESS'){
      clearCart()
    }
  }, [orderdata])

  if(orderdata.isLoading){ 
    return(
    <div className="orderconfirm">
    <CircularProgress />
    <p>Confirming Order</p>
    </div> )
  }else if(orderdata.status ==='SUCCESS'){
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
  )}else{
    return(
      <div className="orderconfirm">
        <h1>Could not place the Order</h1>
        <img src={require('../../../assets/failed.png')} height={200} />
        <div className="orderconfirm__btn">
          <Button 
            type='outlined'
            className={classes.btnStyle}
            onClick={()=>history.push('/')}>Home</Button>
          <Button 
            type='outlined'
            className={classes.btnStyle}
            onClick={()=> history.push('/carts')}>Retry</Button>        
        </div>
      </div>
    )
    
  }
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

export default connect(mapStateToProps, {clearCart})(OrderConfirm);
