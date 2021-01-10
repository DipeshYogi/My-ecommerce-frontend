import React from 'react';
import Slider from 'react-slick';
import './TopShops.css';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { ButtonBase, Button, withStyles } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';
import {withRouter} from 'react-router-dom';
import {getShopItems, getTopShops} from '../../../../actions/shopActions';
import {connect} from 'react-redux';
import LoadingTopDeals from '../../../loadingScreens/loadingTopDeals';

class TopShops extends React.Component{

  componentDidMount(){
    this.props.getTopShops()
  }

  renderArrows = () => {
    return (
      <div className="slider-arrow">
        <ButtonBase
          className="arrow-btn prev"
          onClick={() => this.slider.slickPrev()}
        >
          <ArrowBackIosIcon fontSize='large'/>
        </ButtonBase>
        <ButtonBase
          className="arrow-btn next"
          onClick={() => this.slider.slickNext()}
        >
          <ArrowForwardIosIcon fontSize='large'/>
        </ButtonBase>
      </div>
    )
  }

  getShopItems = (id, name) => {
    this.props.getShopItems(id, name)
    sessionStorage.setItem('homeScrollPos', window.pageYOffset);
    this.props.history.push("/shop-items")
  }

  render(){
    const settings = {
      dots: false,
      infinite:true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
      autoplay: true,
      autoplaySpeed:3000,
      arrows: false
    }

    const { classes } = this.props

    if(this.props.topshops.isLoading === true){
      return <LoadingTopDeals />
    }else{
      return(
        <div className="slider"> 
          {this.renderArrows()}
          <Slider ref={c => (this.slider = c)} {...settings}>
            {this.props.topshops.data.map(shop => (
              <div>
                <div className="shopdeals__shop whiteShadeBackground">
                  <img src={shop.img}/>
                  <h4>{shop.shop_name}</h4>
                  <Rating value={shop.ratings} readOnly size='large' />
                  <Button
                      variant="outlined"
                      size="small"
                      className={classes.btnStyle}
                      onClick={()=> this.getShopItems(shop.shop_id, shop.shop_name)}
                  >
                      View Store
                  </Button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )
    } 
  }
}

const styles = () => ({
    btnStyle :{
        backgroundColor: '#D2452D',
        marginTop:4,
        color: '#FFFF',
        "&:hover":{
            backgroundColor:'#D2452D'
        },
        fontSize:12,
        fontFamily:'Sora'
        }
})

const mapStateToProps = state => ({
  topshops: state.shopReducer.topshops
})

export default connect(mapStateToProps, {getShopItems, getTopShops})
               (withStyles(styles)(withRouter(TopShops)));