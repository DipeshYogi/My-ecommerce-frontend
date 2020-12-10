import React, {useState, useEffect, useRef} from 'react';
import './AllCategories.css';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { getShopByCat } from '../../../actions/shopActions';
import LoadingHomeCats from '../../loadingScreens/loadingHomePage/LoadingHomeCats';

const CategoryView = ({start, end, img, shopCats, getShopByCat}) => {
  const [loadingCategories, setLoadCat] = useState(true)

  useEffect(()=>{
      setLoadCat(shopCats.isLoading)  
  }, [shopCats])

  return(
    <div>
      {loadingCategories ?
      <LoadingHomeCats start={start} end={end}/>
      :
      <div className="container">
        <div className="categoryview">
        {shopCats.data.slice(start, end).map((cat)=>(
          <Link to='/shop-category' style={{textDecoration:'none'}}
                onClick = {() => {
                        getShopByCat(cat.cat_name)
                        }}     
          >
          <div className="category whiteShadeBackground">
              <img src={cat.img_url} alt=''/>
              <div className="category__name">
                  <h4>{cat.cat_name}</h4>
              </div>
          </div>
          </Link>
            ))}
        </div>
      </div>
        }
    </div>
  )
}

const mapStateToProps = state => ({
    shopCats : state.shopReducer.shopCats
  })
  
  export default connect(mapStateToProps,{getShopByCat})(CategoryView);