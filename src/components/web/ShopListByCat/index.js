import React from 'react';
import { Box, Checkbox, Typography, withStyles, Divider, Paper, 
         Grid, Card, CardContent, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import VerifiedUserTwoToneIcon from '@material-ui/icons/VerifiedUserTwoTone';
import {getShopItems} from '../../../actions/shopActions';
import { connect } from 'react-redux';
import './ShopList.css'
import LoadingShops from '../../loadingScreens/loadingShops';
import HandleScrollPosition from '../../../services/HandleScrollPosition';

class ShopListByCat extends React.Component {
  state = {
      freeDelivery: false,
      isVerified: false,
      baggitfilter: false,
      shops: this.props.selectedShops.data,
      isLoading: this.props.selectedShops.isLoading   
  }

  componentDidMount(){
    HandleScrollPosition('shopCatPos')
  }

  componentDidUpdate(prevProps, prevState){
      const {data, isLoading} = this.props.selectedShops
      if(prevProps.selectedShops !== this.props.selectedShops){
          this.setState({shops:data, isLoading:isLoading, freeDelivery:false, isVerified:false})
      }
  }

  toggleFreeDelivery = () =>{
      this.setState({freeDelivery:!this.state.freeDelivery}, ()=>{
          this.applyFilters()
      })
  }

  toggleIsVerified = () =>{
    this.setState({isVerified:!this.state.isVerified}, ()=>{
        this.applyFilters()
    })
  }

  toggleBaggitFilter = () =>{
      this.setState({baggitfilter:!this.state.baggitfilter}, ()=>{
          this.applyFilters()
      })
  }

  applyFilters = () =>{
    const {freeDelivery, isVerified, baggitfilter}= this.state

    this.setState({shops:this.props.selectedShops.data}, () =>{
        if(freeDelivery===true){
            this.setState({shops: this.state.shops.filter(shop => shop.free_delivery === true)})
            }
        if(baggitfilter===true){
            this.setState({shops: this.state.shops.filter(shop => shop.baggit_support === true)})
            }
        if(isVerified===true){
            this.setState({shops: this.state.shops.filter(shop => shop.is_verified === true)})
            }

    })
  }

  onShopClick = (id, name) =>{
    sessionStorage.setItem('shopCatPos', window.pageYOffset);
    this.props.getShopItems(id, name)
  }

  render(){
  const { classes } = this.props;
  const { isLoading } = this.state;

  return(
      <div>
        <Grid container>
          <Grid item lg={2} md={3} xl={9} xs={12}>
            <div className="filterContainer">
              <Box className={classes.filterView} mt={2}>
              <Typography variant='h4' style={{fontFamily:"Roboto"}}>Filters</Typography>
              <Divider />
              <Box display='flex' flexDirection='row' alignItems='center'>
                  <Checkbox
                          checked={this.state.freeDelivery}
                          onChange={()=>this.toggleFreeDelivery()}
                  />
                  <Typography variant='h6' style={{fontFamily:"Sora"}}>Free Delivery</Typography>
              </Box>

              <Box display='flex' flexDirection='row' alignItems='center'>
                  <Checkbox
                          checked={this.state.isVerified}
                          onChange={this.toggleIsVerified}
                  />
                  <Typography variant='h6' style={{fontFamily:"Sora"}}>Verified Shop</Typography>
              </Box>

              <Box display='flex' flexDirection='row' alignItems='center'>
                  <Checkbox
                          checked={this.state.baggitfilter}
                          onChange={this.toggleBaggitFilter}
                  />
                  <Typography variant='h6' style={{fontFamily:"Sora"}}>Bag it</Typography>
              </Box>
              </Box>
            </div>
          </Grid>
          <Grid item lg={10} md={9} xl={9} xs={12}>
            <div className="shopListContainer grayShadeBackground">
                <Box pb={2}>
                <Typography variant="h2" style={{fontFamily:"Roboto"}}>{this.props.selectedCat}</Typography>
                </Box>
                {isLoading ? 
                <LoadingShops/>
                 :
                <div className="shop">
                  {this.state.shops.map((shop)=>(
                    <div className="shop__container whiteShadeBackground">
                      <img src="https://previews.123rf.com/images/rastudio/rastudio1608/rastudio160800769/61001834-shop-store-vector-sketch-icon-isolated-on-background-hand-drawn-shop-store-icon-shop-store-sketch-ic.jpg" 
                            height={180}/>
                      <div className="shop__info"> 
                        <h4>{shop.shop_name}</h4>
                        <Rating value={4} readOnly size='large'/>
                        <p className="darkGrayColor">(214 ratings)</p>
                        <div className="shop__btn">
                          <Link to='/shop-items'>
                            <Button variant="contained" className={classes.btnStyle}
                                    onClick={()=>this.onShopClick(shop.shopid, shop.shop_name)}
                            >
                                <Typography className={classes.btnText}>Jump In</Typography>
                            </Button>
                          </Link>
                        </div>
                      </div>  
                      <div className="shop__attributes">
                          {shop.baggit_support  ?
                          <div>
                            <LocalMallOutlinedIcon/>
                            <p>Bag it</p>
                          </div>
                          :
                          null
                          }
                          {shop.free_delivery ?
                          <div>
                            <LocalShippingOutlinedIcon/>
                            <p>Free Delivery</p>
                          </div>: null }
                          {shop.is_verified  ?
                          <div>
                            <VerifiedUserTwoToneIcon/>
                            <p>Verified business</p>
                          </div>: null }
                        </div>                      
                    </div>
                  ))}

                </div>
                }
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const styles = () => ({
    cardStyles:{
        height:'20%',
        width: '100%'
    },
    infoA:{
        flex:1
    },
    infoB:{
        flex:2
    },
    infoC:{
        flex:1
    },
    infoD:{
        flex:1,
        justifyContent: 'flex-end'
    },
    btnStyle:{
        backgroundColor:'#D2452D',
        "&:hover":{
            backgroundColor:'#D2452D'
        },
        borderRadius: 20,
        height:28
    },
    btnText:{
        color:'#ffff'
    }
})

const mapStateToProps = state => ({
    selectedShops: state.shopReducer.selectedShops,
    selectedCat: state.shopReducer.selectedCat
})

export default connect(mapStateToProps, {getShopItems})(withStyles(styles)(ShopListByCat));