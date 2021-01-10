import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import './home.css';
import { connect } from 'react-redux';
import Deals from '../Deals';
import TopShops from '../TopShops';
import {getShopCat} from '../../../../actions/shopActions';
import { Box, Button, makeStyles } from '@material-ui/core';
import CategoryView from '../../AllCategories/CategoryView';
import HandleScrollPosition from '../../../../services/HandleScrollPosition';

const HomeScreen = ({getShopCat}) => {
  useEffect(() => {
    getShopCat();
    HandleScrollPosition('homeScrollPos');
  }, [])

  const classes = useStyles()
  const history = useHistory()

  return (
    <div className="content-top grayShadeBackground">
      <div>
        <div className="title">
            <h3>Shop Categories</h3>
        </div>
        <Box mt={1}>
          <CategoryView start={0} end={6} />
        </Box>

        <Box mt={2} align='center'>
          <Button
              variant="outlined"
              size="large"
              className={classes.btnStyle}
              onClick={() => history.push('/all-categories')}
          >
              View More
          </Button>
        </Box>
      </div>

      <div>
        <div className="title1">
          <h3>Top Deals</h3>
        </div>
        <div>
          <Deals/>
        </div> 
      </div>

      <div>
        <div className="title1">
            <h3>Top Stores near you</h3>
        </div>
        <div>
            <TopShops/>
        </div>
      </div>
    </div>

  )
}

const useStyles = makeStyles({
  btnStyle :{
      backgroundColor: '#D2452D',
      color: '#FFFF',
      "&:hover":{
          backgroundColor:'#D2452D'
      },
      fontSize:12,
      fontFamily:'Sora'
      }
  })


export default connect(null, { getShopCat })(HomeScreen);