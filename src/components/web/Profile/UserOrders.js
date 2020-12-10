import React from 'react';
import './Profile.css'
import ListAltTwoToneIcon from '@material-ui/icons/ListAltTwoTone';
import {withStyles, Button} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { withRouter } from 'react-router-dom' 


class UserOrders extends React.Component{
  render(){
    const {classes, history} = this.props
    return(
      <div className="ordersInfo">
        <ListAltTwoToneIcon className={classes.iconStyle}/>
        <div>
            <h4>My Orders</h4>
            <h5>View/review current order.</h5>
            <h5>Check past orders</h5>
        </div>
        <div className="ordersInfo__btn">
          <Button variant="outlined" className={classes.btnStyle}
                  startIcon={<VisibilityIcon fontSize='small'/>}
                  onClick={()=>history.push('/my-orders')}>
            View
          </Button>
        </div>
      </div>
     )
  }
}

const styles = () =>({
    iconStyle:{
        fontSize: 100
    },
    btnStyle :{
        height:25,
        width:90,
        backgroundColor: '#D2452D',
        color: '#FFFF',
        "&:hover":{
            backgroundColor:'#D2452D'
        },
        fontSize:11,
        fontFamily:'Sora'
    }
})

export default withRouter(withStyles(styles)(UserOrders));