import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'
import { Box, Button, Typography, Card, Grid, CardContent, withStyles,
         Avatar, IconButton, Modal } from '@material-ui/core';
import {addToCart, removeFromCart, clearCart} from '../../../actions/cartActions';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import './ShopItems.css';

class ShopItems extends React.Component{
    state={
        cartConflict: false
    }

    checkCartConflict(id, name, price, discount){
        // if cart conflict is present then display the proper error. Else add the item
        if((this.props.cart.length>0) && (this.props.cartShopUserId !== this.props.selectedShopUserId)){
            this.setState({cartConflict:true})
        }else{
            this.props.addToCart(id, name, price, discount)
        }
    }

    render(){
        const {classes} = this.props
        return(
            <div className="containerStyles grayShadeBackground">
              <div>
              <Box pb={2}>
                  <Typography variant="h2">{this.props.shopName}</Typography>
                </Box>
                    {this.props.shopItems.map((item)=>(
                    <div className="itemStyle">
                        <Box className={classes.infoB}>
                            <Avatar variant='square' src='https://static.thenounproject.com/png/1434570-200.png'
                                    className={classes.largeImg}/>
                        </Box>
                        <Box display="flex" className={classes.infoC}>
                            <Typography variant="h5" >Brand</Typography>
                            <Typography variant="h6" style={{fontFamily:"Sora"}}>{item.name}</Typography>
                        </Box>
                        <Box display="flex" className={classes.infoD}>
                            <Typography variant="h5">units</Typography>
                        </Box>
                        <Box className={classes.infoE}>
                            <Typography variant="h5" style={{fontFamily:"Roboto"}}>MRP</Typography>
                            <Typography variant="h5">Offer Price:</Typography>
                            <Typography variant="h5" className={classes.savingsText}>Savings:</Typography>
                        </Box>
                        <Box className={classes.infoE}>
                            <Typography variant="h5">&#8377;{item.price}</Typography>
                            <Typography variant="h5">&#8377;0</Typography>
                            <Typography variant="h5" className={classes.savingsText}>&#8377;{item.discount}</Typography>
                        </Box>
                        <Box display="flex" className={classes.infoF}>
                            {this.props.cart.find(c=>(c.id === item.id) && (c.name === item.name))?
                                <Box display='flex' flexDirection='row'>
                                <IconButton
                                    onClick={()=>
                                        this.props.removeFromCart(item.id)
                                    }       
                                >
                                    <RemoveCircleOutlineIcon fontSize="large" className={classes.btnStyles1}/>
                                </IconButton>
                                <Box pt={1.5}>
                                    <Typography className={classes.qtyStyle}>{this.props.cart.find(c => c.id ===item.id).quantity}</Typography>   
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
                        </Box>
                    </div>
                    ))}
              </div>
              {this.props.cart.length>0 && this.state.cartConflict===false ?
                <div className="styleFooter blueShadeBackground" >
                    <div className={classes.footer__left}>
                         <ShoppingCartOutlinedIcon className={classes.cartIcon} />
                         <p>{this.props.cart.reduce((accum, item)=> accum+item.quantity,0)} items </p>
                         <p className={classes.amountStyle}>₹{this.props.cart.reduce((accum,item)=>
                                                        accum+(item.quantity*item.price),0
                         )}</p>
                    </div>
                    <div className={classes.footer__right}>
                        <Link to='/carts'>
                         <Button variant="contained" className={classes.btnStyle}>Proceed to checkout</Button>
                        </Link>
                    </div>
                </div>
              : null}

                
                <Modal
                    className={classes.modal}
                    open = { this.state.cartConflict }
                >
                    <div className={classes.paper}>
                        <h2 style={{fontFamily:"Roboto"}}>Ooops!!</h2>
                        <Box mt={2} display='flex' flexDirection='column' alignItems='center'>
                        <h5 style={{fontFamily:"Sora"}}>You cart contains items from</h5>
                        <h4 style={{fontFamily:"Sora"}}> {this.props.cartShopName}</h4>
                        <Box mt={2} display='flex' flexDirection='column' alignItems='center'>
                        <Button 
                            className = {classes.btnStyle}
                            onClick={()=>{
                                this.props.clearCart()
                                this.setState({cartConflict:false})
                             }}>Clear Cart and Continue</Button>
                        <Button
                            className = {classes.btnStyle} 
                            onClick={()=>this.setState({cartConflict:false})}>
                                Close
                        </Button>
                        </Box>
                        </Box>
                    </div>   
                </Modal>
            </div>
        )
    }
}


const styles = (theme) => ({
    footer__left:{
        display:'flex',
        // justifyContent:'space-between',
        paddingLeft: 100
    },
    footer__right:{
        paddingRight: 100
    },
    btnStyle:{
        backgroundColor:"white",
        height:35,
        borderRadius:30,
        color:"purple",
        fontSize:12,
        fontWeight:"bold"
    },
    amountStyle:{
        paddingLeft:20,
        color: 'grey'
    },
    modal:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cartIcon:{
        width:40,
        height:40,
        color:'white'
    },
    paper:{
        backgroundColor: theme.palette.background.paper,
        border: '0px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3), 
        borderRadius: 15,
        height:200,
        width:300,
        display: 'flex',
        // justifyContent:'center',
        alignItems: 'center',
        flexDirection:'column'
    }, 
    largeImg: {
        width: theme.spacing(7),
        height: theme.spacing(7),
      },
    infoA:{
        flex:1
    },
    infoB:{
        flex:0.1
        },
    infoC:{
        flex:0.2,
        flexDirection: 'column',
        paddingTop:12
    },
    infoD:{
        flex:0.3,
        paddingTop:20
    },
    infoE:{
        flex:0.1
    },
    infoF:{
        flex:0.2,
        paddingTop:10,
        justifyContent: 'center',
    },
    savingsText:{
        color: '#D2452D'
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
    qtyStyle:{
        fontSize: 15
    }
})

const mapStateToProps = state => ({
    shopName:state.shopReducer.selectedShopName,
    selectedShopUserId:state.shopReducer.selectedShopUserId,
    shopItems:state.shopReducer.selectedShopItems,
    cart:state.shopReducer.addedItems,
    cartShopUserId: state.shopReducer.cartShopUserId,
    cartShopName: state.shopReducer.cartShopName

})

export default connect(mapStateToProps,{addToCart, removeFromCart, clearCart})(withStyles(styles)(ShopItems));