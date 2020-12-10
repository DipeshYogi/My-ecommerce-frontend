import React from 'react'
import { Grid, Card } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { productQuantity, clearProduct } from '../../../actions/productQuantity'
import { addToCart, removeFromCart } from '../../../actions/cartActions';
import './cart.css';

function Cart({ cartProps, addToCart , removeFromCart, cartItems }) {
    let productsInCart = [];
    Object.keys(cartProps.products).forEach(function (item) {
        if (cartProps.products[item].inCart) {
            productsInCart.push(cartProps.products[item])
        }
    })
    // console.log("cart number", cartProps)
    return (
        <div>
          <Grid container className="shopping_cart">
              <Grid item md={2} lg={2} xl={2}></Grid>
              <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                  <div className="spec ">
                      <h3>Shopping Cart</h3>
                      {/* <div className="ser-t">
                          <b />
                          <span><i /></span>
                          <b className="line" />
                      </div> */}
                  </div>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                      <table className="table ">
                        <tbody>
                          <tr>
                              <th className="t-head head-it ">Products</th>
                              <th className="t-head">Price</th>
                              <th className="t-head">Quantity</th>
                              <th className="t-head">Total</th>
                          </tr>
                              {
                              // productsInCart.map((product, index) => {
                              cartItems.map((product, index) => {
                                  return (
                                      <tr className="cross1" key={index}>
                                          <td className="t-data">
                                              <img src="https://static.thenounproject.com/png/1434570-200.png" height="60" alt="" />
                                              <div className="sed">
                                                  <h5>{product.name}</h5>
                                              </div>
                                              {/* <div className="clearfix"> </div>
                                              <div className="close2" onClick={() => clearProduct(product.tagName)}> <i className="fa fa-times" aria-hidden="true" /></div> */}
                                          </td>
                                          <td className="t-data">{product.price}</td>
                                          <td className="t-data"><div className="quantity">
                                              {/* <div className="quantity-select">
                                                  <div className="entry value-minus" onClick={() => removeFromCart(product.id)}>&nbsp;</div>
                                                  <div className="entry value">{product.quantity}</div>
                                                  <div className="entry value-plus active" onClick={() => addToCart(product.id, product.price)}>&nbsp;</div>
                                              </div> */}
                                              <div className="quantity-select">
                                              <div className="quantityEdits">
                                                  <div className="entry value-minus" onClick={() => removeFromCart(product.id)}>&nbsp;</div>
                                                  <div style={{fontSize:15, fontWeight:'bold', paddingTop:10, width:20, display:'flex', justifyContent:'center'}}>{product.quantity}</div>
                                                  <div className="entry value-plus active" onClick={() => addToCart(product.id, product.price)}>&nbsp;</div>
                                              </div>
                                              </div>
                                          </div>
                                          </td>
                                          <td className="t-data t-w3l">{product.price * product.quantity}</td>
                                      </tr>
                                      )
                                  })
                              }

                        </tbody>
                      </table>
                    </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} className="price_details_bk">
                          <Card>
                              <span className="title">Price details</span>
                              <div class="_2twTWD">
                                  <div class="hJYgKM">
                                      <div class="_10vVqD">Price ({cartItems.reduce((accum, item)=>
                                                      accum+item.quantity, 0
                                      )} items)</div>
                                      <span> ₹{cartItems.reduce((accum,item)=> accum+item.price,0)}</span>
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
                                                  <span > ₹{cartItems.reduce((accum,item)=> accum+item.price,0)}</span>
                                              </div>
                                          </span>
                                      </div>
                                  </div>
                                  <div class="_22vQVX">You will save ₹{
                                          cartItems.reduce((accum, item)=> accum+item.discount, 0 )
                                  } on this order</div>
                              </div>
                              <Link to="/checkout">
                                  <div className="process_checkout_bk">
                                      <span>Proceed to Checkout</span>
                                  </div>
                              </Link>
                          </Card>
                      </Grid>
                  </Grid>
              </Grid>
              {/* <Grid item xs={2} sm={2} md={2} lg={2} xl={2}></Grid> */}
          </Grid>
        </div>

    )
}
const mapStateToProps = (state) => ({
    cartProps: state.cartState,
    cartItems: state.shopReducer.addedItems
});

export default connect(mapStateToProps, {  addToCart, removeFromCart })(Cart);