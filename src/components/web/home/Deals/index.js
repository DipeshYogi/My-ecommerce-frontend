import React from 'react';
import Slider from 'react-slick';
import './Deals.css';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { ButtonBase, withStyles, Button } from '@material-ui/core';
import {getShopItems} from '../../../../actions/shopActions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Deals extends React.Component{
  state={
    dealsData : [
      {userId:4,shopName:"Mera Kirana", item:"Potato", price:40, discount:20, img:"https://www.thehindubusinessline.com/economy/3devif/article24323505.ece/ALTERNATES/LANDSCAPE_1200/bl04dairy%20product"},
      {userId:3,shopName:"Karan Fastfoods", item:"French Fries", price:90, discount:15, img:"https://c.ndtvimg.com/2019-11/2kakjdo8_fruits_625x300_27_November_19.jpg"},
      {userId:4,shopName:"Ganesh Groceries", item:"Tomatoes", price:40, discount:20, img:"https://media2.s-nbcnews.com/j/newscms/2019_10/2774946/190305-hangers-clothes-stock-cs-1157a_ffc0e2e6134b64a16884392cc8b6340a.fit-760w.jpg"},
      {userId:3,shopName:"Trpitis", item:"Samosa", price:15, discount:5, img:"https://i.pinimg.com/originals/29/69/c3/2969c3a6e22d39d0dbadb189d9d8310b.jpg"},
      {userId:4,shopName:"Walmart", item:"Redbull", price:66, discount:25, img:"https://media2.s-nbcnews.com/j/newscms/2019_10/2774946/190305-hangers-clothes-stock-cs-1157a_ffc0e2e6134b64a16884392cc8b6340a.fit-760w.jpg"},
    ]
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
      autoplaySpeed:3000,
      arrows: false
    }

    const { classes } = this.props

    return(
      <div className="slider"> 
        {this.renderArrows()}
        <Slider ref={c => (this.slider = c)} {...settings}>
          {this.state.dealsData.map(deals => (
            <div>
              <div className="shopdeals__shop whiteShadeBackground">
                <img src={deals.img}/>
                <h4>{deals.shopName}</h4>
                <div className="shopdeals__shop__pricing">
                  <h4 className="redColor">Save ₹{deals.discount}</h4>
                  <h5>{deals.item}</h5>
                  <div>
                    <h5 className="actualPrice redColor">₹{deals.price + deals.discount}</h5>
                    <h5 className="discountPrice">₹{deals.price}</h5>
                  </div>
                  <Button
                    variant="outlined"
                    size="small"
                    className={classes.btnStyle}
                    onClick={()=> this.getShopItems(deals.userId, deals.shopName)}
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

export default connect(null, {getShopItems})(withStyles(styles)(withRouter(Deals)));