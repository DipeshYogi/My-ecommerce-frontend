import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Box, Button, Typography, Card, Grid, CardContent, withStyles,
  Avatar, IconButton, Modal } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { addToCart, removeFromCart } from '../../../actions/cartActions';
import { createOrder } from '../../../actions/orderActions';
import './cart.css';

class Cart extends React.Component{
    state = {
      active_address : []
    }

    componentDidMount(){
      let active = this.props.address.find((add) => add.is_active === true)
      if(active){
        this.setState({active_address:active})
      }
    }

    placeOrder = () =>{
      const {history, cartCust, cartShop, cartItems} = this.props;
      this.props.createOrder(cartCust.userdata.id, cartShop, cartItems)
      history.push('/order-confirm')
    }

    render(){
			const {classes} = this.props;
      const {history} = this.props;
      const {address1, address2, pincode, phone} = this.state.active_address;
      return (
        <div>
          <Grid container className="shopping_cart grayShadeBackground">
            <Grid item md={3} lg={3} xl={3}>
              <div className="deliveryInfo whiteShadeBackground">
                <h3 className="headerTitle">Delivery Address</h3>
                <div className="deliveryInfo__address grayShadeBackground">
                  <LocationOnIcon fontSize="large" />
                  <div>
                      <h4>{address1}</h4>
                      <h6>{address2}</h6>
                      <h6>{pincode}</h6>
                      <h6>{phone}</h6>
                  </div>
                </div>
                <div>
                  <Button variant="outlined" className={classes.btnAddr}
                                  onClick={()=> history.push("/my-addresses")}	>
                      Change Address
                  </Button> 
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8} >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                  <div className="itemList whiteShadeBackground">
                    <h3 className="headerTitle">Shopping Cart</h3>
                    <div>
                    {this.props.cartItems.map((item)=>(
                      <div  className="itemsContainer">
                        <div className="itemStyle">
                          <img src="https://static.thenounproject.com/png/1434570-200.png" height={60}/>
                          <div className="infoGroup">
                            <h4>{item.name}</h4>
                            {item.discount>0?
                              <div>
                              <h4>₹{item.price - item.discount}</h4>
                              <h5 className="discountStyle darkGrayColor">₹{item.price}</h5>
                              <h5 className="saveStyle redColor">You save ₹{item.discount}</h5>
                              </div>
                              :
                              <h4>₹{item.price - item.discount}</h4> 
                              }
                          </div>
                         </div>
                         <div className="btnGroup">
                          {this.props.cartItems.find(c=>(c.id === item.id) && (c.name === item.name))?
                            <Box display='flex' flexDirection='row'>
                            <IconButton
                                onClick={()=>
                                    this.props.removeFromCart(item.id)
                                }       
                            >
                                <RemoveCircleOutlineIcon fontSize="large" className={classes.btnStyles1}/>
                            </IconButton>
                            <Box pt={1.5}>
                                <Typography className={classes.qtyStyle}>{this.props.cartItems.find(c => c.id ===item.id).quantity}</Typography>   
                            </Box> 
                            <IconButton
                                onClick={()=>
                                    this.props.addToCart(item.id, item.price)
                                }       
                            >
                                <AddCircleOutlineIcon fontSize="large" className={classes.btnStyles1}/>
                            </IconButton>
                            </Box>

                            :
                            <Button variant="contained" color="primary" className={classes.btnStyles}
                                    onClick={()=>{
                                        this.checkCartConflict(item.id, item.name, item.price, item.discount)
                                        // this.props.addToCart(item.id, item.name, item.price, item.discount)
                                    }

                                    }
                            >
                            Add
                            </Button>}
                          </div>
                      </div>                                                  
                      ))}
                    </div>
                  </div>
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} className="price_details_bk">
                  <div className="price_details whiteShadeBackground">
											<h4 className="headerTitle">Price Details</h4>
                      <div class="_2twTWD">
                          <div class="hJYgKM">
                              <div class="_10vVqD">MRP Total ({this.props.cartItems.reduce((accum, item)=>
                                              accum+item.quantity, 0
                              )} items)</div>
                              <span> ₹{this.props.cartItems.reduce((accum,item)=> accum+(item.price*item.quantity),0)}</span>
                          </div>
                          <div class="hJYgKM">
                              <div class="_10vVqD">Loyalty Points</div>
                              <span>- ₹22</span>
                          </div>
                          <div class="hJYgKM">
                              <div class="_10vVqD">Discount</div>
                              <span>- ₹{
                                  this.props.cartItems.reduce((accum, item)=> accum+(item.quantity*item.discount), 0 )
                             }</span>
                          </div>
                          <div class="hJYgKM">
                              <div class="_10vVqD">Delivery Fee</div>
                              <span><span class="_27kB8M _3Oa-sk">Free</span></span>
                          </div>
                          <div class="_3xFQAD">
                              <div class="hJYgKM">
                                  <div class="_10vVqD" style={{fontWeight:'600'}}>Total Amount</div>
                                  <span>
                                      <div class="tnAu1u" style={{fontWeight:'bold'}}>
                                          <span > ₹{this.props.cartItems.reduce((accum,item)=> accum+(item.price*item.quantity),0)}</span>
                                      </div>
                                  </span>
                              </div>
                          </div>
                          <div class="_22vQVX">You will save ₹{
                                  this.props.cartItems.reduce((accum, item)=> accum+(item.quantity*item.discount), 0 )
                          } on this order</div>
                      </div>
                      {this.props.cartItems.length !== 0 ?
                        <div>
                          <Button 
                            variant="outlined"
                            className={classes.btnAddr}
                            onClick={()=> this.placeOrder()}>
                              Place Order
                          </Button> 
                        </div>
                        :
                        null
                      }
                  </div>
              </Grid>
             </Grid>
            </Grid>
          </Grid>
        </div>
    )
    }
}

const mapStateToProps = (state) => ({
    cartItems: state.shopReducer.addedItems,
    address: state.profileReducer.addr,
    cartShop: state.shopReducer.cartShopUserId,
    cartCust: state.authReducer.userdata.data
});


const styles = (theme) => ({
  footer__left:{
      display:'flex',
      // justifyContent:'space-between',
      paddingLeft: 100
  },
  footer__right:{
      paddingRight: 100
  },
  amountStyle:{
      paddingLeft:20,
      color: 'grey'
  },
  largeImg: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  btnStyles:{
      height: 30,
      backgroundColor:'#D2452D',
      "&:hover":{
          backgroundColor:'#D2452D'
      },
      marginTop:10
  },
  btnStyles1:{
      color:'#D2452D',
      "&:hover":{
          color:'#D2452D'
      }
	},
	btnAddr:{
		backgroundColor:'#D2452D',
			"&:hover":{
				backgroundColor:'#D2452D'
			},
		color:"#FFFF",
		width: '100%',
		height: 40,
		fontSize:12,
		fontFamily:"Roboto"
	},
  qtyStyle:{
      fontSize: 15
  }
})

export default connect(mapStateToProps, {addToCart, removeFromCart, createOrder})
               (withStyles(styles)(withRouter(Cart)));