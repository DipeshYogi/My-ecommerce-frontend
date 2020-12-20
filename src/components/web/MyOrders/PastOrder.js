import React, {useState, useEffect} from 'react';
import './MyOrder.css';
import {Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import {getUserOrders} from '../../../actions/orderActions';
import {connect} from 'react-redux';

function PastOrder({getUserOrders, orders}){
    const [activeOrd, setActiveOrd] = useState()
    const [ordLines, setOrdLines] = useState()

    const classes = useStyles();

    useEffect(()=>{
      getUserOrders()
    }, [])

    useEffect(()=> {
      if(orders.HeaderInfo){
        let ord = orders.HeaderInfo.filter(ord => ord.HSTS !== 'ONGOING')
        setActiveOrd(ord)
        setOrdLines(orders.LineInfo)
      }
    }, [orders])

    return(
      <div>
      {activeOrd ? 
      <div>
        {activeOrd.map(ord => (
        <div className="currentOrder">
          <div className="currentOrder__title">
            <p>Order status</p>
            <p>Shop Name</p>
            <p>Order Total ({ordLines.filter(line => line.LORD === ord.HORD).length} items)</p>
          </div>
          <div className="currentOrder__title1">
            <p>{ord.HSTS}</p>
            <p>{ord.HSNME}</p>
            <p>₹ {ordLines.filter(line => line.LORD === ord.HORD).reduce((accum, price) =>
                  accum + price.LPRIC, 0
            )}</p>
          </div>
          {ordLines.filter(line => line.LORD === ord.HORD).slice(0,2).map(itm => (
            <div className="currentOrder__lines">
              <img src="https://static.thenounproject.com/png/1434570-200.png" />
                <div className="currentOrder__lines__info"> 
                  <p>{itm.LPROD}</p>
                  <p>Qty: {itm.LQORD}</p>
                </div>
              </div>
          ))}

          <div className="currentOrder__bottom">
            <p>+{ordLines.filter(line => line.LORD === ord.HORD).length - 2} items more</p>
          </div>
          <div className="currentOrder__btns">
            <Link to={{pathname:'/order-details', HORD: ord.HORD}}>
            <Button
              variant="contained"
              className={classes.btnStyle}
            >
              View Details
            </Button>

            <Button
              variant="contained"
              className={classes.btnStyle1}
            >
              Need Help
            </Button> 
            </Link>
          </div>
        </div>
        ))}
      </div> : null}
      </div>

    )
}

const useStyles = makeStyles({
  btnStyle:{
    backgroundColor:'#D2452D',
    "&:hover":{
        backgroundColor:'#D2452D'
    },
    height:30,
    marginTop:10,
    color:'#ffff',
    fontFamily:'Sora'
  },
  btnStyle1:{
    backgroundColor:'#D2452D',
    "&:hover":{
        backgroundColor:'#D2452D'
    },
    height:30,
    marginTop:10,
    color:'#ffff',
    fontFamily:'Sora'
  }
})

const mapStateToProps = state => ({
  orders: state.orderReducer.userorders.data
})

export default connect(mapStateToProps, {getUserOrders})(PastOrder);