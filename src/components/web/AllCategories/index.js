import React from 'react';
import './AllCategories.css';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { getShopByCat } from '../../../actions/shopActions';
import CategoryView from './CategoryView';

const AllCategories = ({props}) => {
    return(
      <div className="allcategories grayShadeBackground">
        <h3>All Categories</h3>
        <CategoryView start={0} end={3} img={'https://www.thehindubusinessline.com/economy/3devif/article24323505.ece/ALTERNATES/LANDSCAPE_1200/bl04dairy%20product'}/>
        <CategoryView start={3} end={6} img={'https://c.ndtvimg.com/2019-11/2kakjdo8_fruits_625x300_27_November_19.jpg'}/>
        <CategoryView start={6} end={9} img={'https://www.thehindubusinessline.com/economy/3devif/article24323505.ece/ALTERNATES/LANDSCAPE_1200/bl04dairy%20product'}/>
        <CategoryView start={9} end={12} img={'https://c.ndtvimg.com/2019-11/2kakjdo8_fruits_625x300_27_November_19.jpg'}/>
        <CategoryView start={12} end={15} img={'https://media2.s-nbcnews.com/j/newscms/2019_10/2774946/190305-hangers-clothes-stock-cs-1157a_ffc0e2e6134b64a16884392cc8b6340a.fit-760w.jpg'}/>
        <CategoryView start={15} end={18} img={'https://media2.s-nbcnews.com/j/newscms/2019_10/2774946/190305-hangers-clothes-stock-cs-1157a_ffc0e2e6134b64a16884392cc8b6340a.fit-760w.jpg'}/>
        <CategoryView start={18} end={21} img={'https://media2.s-nbcnews.com/j/newscms/2019_10/2774946/190305-hangers-clothes-stock-cs-1157a_ffc0e2e6134b64a16884392cc8b6340a.fit-760w.jpg'}/>
      </div>
    )
}

const mapStateToProps = state => ({
  shopCats : state.shopReducer.shopCats
})

export default connect(mapStateToProps,{getShopByCat})(AllCategories);