import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { Grid, Button, withStyles } from '@material-ui/core';
import './header.css';
import { connect } from 'react-redux';
import { getShopByCat } from '../../../actions/shopActions';
import { logoutAction } from '../../../actions/authActions';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import SearchBar from './SearchBar';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';

class Header extends Component {
  state = {
      currentSelection: 'home',
      dropdownMode: false,
      disableHover: false,
      loginModal: false,
      registerModal: false,
      setSticky: false,
      active_pin: ''
  }

  componentDidMount(){
    const {address} = this.props;
    if(address){
      let active_addr = address.find(add => add.is_active === true)
      if(active_addr){
       this.setState({active_pin: active_addr.pincode})
      }
    }
  }

  componentDidUpdate(prevProps, prevState){
    const {address} = this.props;
    if(address && prevProps.address !== this.props.address){
      let new_active_addr = address.find(add => add.is_active === true)
      if(new_active_addr){
      this.setState({active_pin: new_active_addr.pincode})
      }
    }
  }

  getShopByCategory(name){
    this.props.getShopByCat(name)
    setTimeout(()=>{
      this.setState({disableHover:false})
    }, 1000)
    
  }

  gotoRegister = () => this.setState({loginModal:false, registerModal:true})

  closeLogin = () => this.setState({loginModal:false})

  closeRegister = () => this.setState({registerModal:false})

  render() {
    const { classes, history, addedItems } = this.props;
    const { setSticky } = this.state;
    return (
      <div>                  
        <Grid container className="header__sticky"> 
          <Grid item xs={12} className="blueShadeBackground">
            <div className="header1">
                <Link to='/'>
                <div className="header1__logo">                
                    <img src={require("../../../assets/myecom.png")} height='55' />                                     
                </div>       
                </Link>             
                <div className="header1__search">
                  <SearchBar/>
                </div>
                <div className="header1__info">
                    { !this.props.isAuthenticated ?
                    <div>
                    <Button
                      onClick={()=>this.setState({loginModal:true})}        
                    >
                      Login
                    </Button>
                    {/* <Button><Link to="/register" style={{textDecoration:'none'}}>Register</Link></Button> */}
                    <Button
                      onClick={()=>this.setState({registerModal:true})} 
                    >
                      Register
                    </Button>
                    </div>
                    :
                    <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                    <h4>Hey {this.props.userdata.name}</h4>
                    <Link to='/profile'><AccountCircleIcon className={classes.accountStyles}/></Link>
                    <Button>
                        <Link 
                            to="/"
                            style={{textDecoration:'none', cursor:'default'}}
                            onClick={()=>this.props.logoutAction()}
                        >
                                Logout
                        </Link>
                    </Button>
                    <div className="header1__info__cart">
                      <Link to="/carts">
                        <Button style={{borderRadius:50}}>
                        {/* <ShoppingCartOutlinedIcon className={classes.cartStyle}/> */}
                        <ShoppingCartOutlinedIcon fontSize='large' className={classes.cartStyle}/>
                        <div>
                          <h5 className={classes.quantityStyle}>
                          {addedItems.reduce((accum, item) =>
                                          accum + item.quantity , 0                                  
                              )}
                          </h5>
                        </div>
                        {addedItems.reduce((accum, item)=>accum + item.quantity , 0) > 0 ? 
                        <div className="cart__dropdown">
                          <div className="cart__dropdown__content">
                            <div className="cart__dropdown__summary">
                              <h4>Order Summary</h4>
                              <h5>{this.props.addedItems.reduce((accum, item) =>
                                            accum + item.quantity , 0                                  
                                )} item(s)</h5>
                            </div>
                            
                            {this.props.addedItems.slice(0,2).map(itm =>(
                            <div className="cart__dropdown__items">
                              <h5>{itm.name}</h5>
                              <div>
                                <h5>₹{itm.price}</h5>
                                <h5>x{itm.quantity}</h5>
                              </div>
                            </div>
                            ))}

                            {this.props.addedItems.length > 2?
                            <div className="cart_rem_items">
                              <h6>+{this.props.addedItems.length - 2} items</h6>
                            </div>  
                            :null
                            }

                            <div className="cart_total_info">
                              <div>
                                <h4>
                                  ₹{this.props.addedItems.reduce((accum, itm)=> accum+itm.price, 0)}
                                </h4>
                                <h5>
                                  You save ₹{this.props.addedItems.reduce((accum, itm)=> accum+itm.discount, 0)}
                                </h5>
                              </div>
                              <div>
                                <Button variant="contained" color="primary" className={classes.btnStyles}>
                                 View Cart
                                </Button>
                              </div>
                            </div>
                          </div>                        
                        </div>
                        : null}
                        </Button>                                  
                      </Link>
                    </div>
                    </div>
                    }                               

                </div>
            </div>
          </Grid>
          <Grid item xs={12} className="whiteShadeBackground">                  
            <div className="header2">
                <div className={`header2__options ${this.state.currentSelection==='home'?'header2__options--active':''}`}>
                  <Link to='/' onClick={()=>this.setState({currentSelection:'home'})}>
                  <Button>
                      <HomeIcon className="iconStyle" fontSize='large'/>
                  </Button>
                  </Link>
                </div>
                {this.props.isAuthenticated?
                <Button
                  onClick={()=>history.push('/my-addresses')}>
                  <div className="header2__location">
                   <LocationOnIcon fontSize='large'/>
                    <div>
                      <h5>Deliver to</h5>
                      <h5>
                       {this.state.active_pin}
                      </h5>
                    </div>
                  </div>
                </Button>:
                null
                }


                <div className={`${this.state.disableHover?'dropdown1':'dropdown'}`}>
                  <Button className="dropbtn"
                        onClick={()=>this.setState({dropdownMode:!this.state.dropdownMode})}>
                    <h5 className="headerCat">Categories<i class="fa fa-caret-down"></i></h5>
                  </Button>
                  
                  <div className="dropdown__content">
                    <div className="dropdown__content__cat"> 
                      {this.props.categories.map(cat=>(
                        <div className="dropdown__items">  
                          <Link to="/shop-category" onClick= {()=>
                              this.setState({disableHover:true}, ()=>{
                                this.getShopByCategory(cat.cat_name)
                              })
                          } >
                          <Button>
                              <h5 className="headerCat">{cat.cat_name}</h5>
                          </Button> 
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
            </div>
          </Grid>                    
        </Grid>

        {/* Login Screen */}
        <div>
          <Dialog
            open={this.state.loginModal}
            onClose={()=>this.setState({loginModal:false})}          
          > 
            <LoginScreen 
              gotoRegisterScreen={this.gotoRegister}
              closeLoginScreen={this.closeLogin} />
            <div className="modal__close">
              <Button onClick={()=>this.setState({loginModal:false})}>
                <CloseIcon style={{fontSize:25, color:"white"}}/>
              </Button>
            </div>
          </Dialog>
        </div>

        {/* Register Screen */}
        <div>
          <Dialog
            open={this.state.registerModal}
            onClose={()=>this.setState({registerModal:false})}          
          > 
            <RegisterScreen closeRegisterScreen={this.closeRegister}/>
            <div className="modal__close">
              <Button onClick={()=>this.setState({registerModal:false})}>
                <CloseIcon style={{fontSize:25, color:"white"}}/>
              </Button>
            </div>
          </Dialog>
        </div>
      </div>
      )
  }
}

const mapStateToProps = (state) => ({
    addedItems: state.shopReducer.addedItems,
    isAuthenticated: state.authReducer.isAuthenticated,
    userdata: state.authReducer.userdata.data.userdata,
    categories: state.shopReducer.shopCats.data,
    address: state.profileReducer.addr
});

const styles = theme => ({
    iconStyle:{
        fontSize:40
    },
    cartStyle:{
        position:'absolute',
        color:'orange',
        zIndex: 1,
        fontSize:35
    },
    accountStyles:{
        fontSize:30,
        color: 'white'  
    },
    quantityStyle:{
        position:'relative',
        bottom: 15,
        color: 'white',
        fontWeight:'bold',
        zIndex: 1
    },
    btnStyles:{
        height: 25,
        fontSize:12,
        backgroundColor:'#D2452D',
        "&:hover":{
            backgroundColor:'#D2452D'
        },
        marginTop:10
    }
})

export default withRouter(connect(mapStateToProps, { getShopByCat, logoutAction })
               (withStyles(styles)(Header)));

