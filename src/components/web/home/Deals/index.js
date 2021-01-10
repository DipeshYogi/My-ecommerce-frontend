import React from 'react';
import Slider from 'react-slick';
import './Deals.css';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { ButtonBase, withStyles, Button } from '@material-ui/core';
import {getShopItems, getTopDeals} from '../../../../actions/shopActions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoadingTopDeals from '../../../loadingScreens/loadingTopDeals';

class Deals extends React.Component{

  componentDidMount(){
    this.props.getTopDeals()
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
    this.props.getShopItems(id, name);
    sessionStorage.setItem('homeScrollPos', window.pageYOffset);
    this.props.history.push("/shop-items");
  }

  render(){
    const settings = {
      dots: false,
      infinite:true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
      autoplay: true,
      autoplaySpeed:4000,
      arrows: false
    }

    const { classes } = this.props

    if(this.props.topdeals.isLoading === true){
      return <LoadingTopDeals />
    }else{
      return(
        <div className="slider"> 
          {this.renderArrows()}
          <Slider ref={c => (this.slider = c)} {...settings}>
            {this.props.topdeals.data.slice(0,7).map(deals => (
              <div>
                <div className="shopdeals__shop whiteShadeBackground">
                  <img src={deals.img}/>
                  <h4>{deals.shop_name}</h4>
                  <div className="shopdeals__shop__pricing">
                    <h4 className="redColor">Save ₹{deals.discount}</h4>
                    <h5>{deals.item_name}</h5>
                    <div>
                      <h5 className="actualPrice redColor">₹{deals.list_price}</h5>
                      <h5 className="discountPrice">₹{deals.list_price - deals.discount}</h5>
                    </div>
                    <Button
                      variant="outlined"
                      size="small"
                      className={classes.btnStyle}
                      onClick={()=> this.getShopItems(deals.shop_id, deals.shop_name)}
                    >
                      View Store
                  </Button>
                  </div>
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
      marginTop:6,
      color: '#FFFF',
      "&:hover":{
          backgroundColor:'#D2452D'
      },
      fontSize:12,
      fontFamily:'Sora'
      }
})

const mapStateToProps = state => ({
  topdeals: state.shopReducer.topdeals
})

export default connect(mapStateToProps, {getShopItems, getTopDeals})
              (withStyles(styles)(withRouter(Deals)));