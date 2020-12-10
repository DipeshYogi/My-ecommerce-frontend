import React from 'react';
import './Profile.css'
import LocationOnTwoToneIcon from '@material-ui/icons/LocationOnTwoTone';
import {withStyles, Button} from '@material-ui/core';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { withRouter } from 'react-router-dom';
import {getUserAddresses} from '../../../actions/profileActions'; 
import {connect} from 'react-redux';


class UserAddresses extends React.Component{
  goToAddresses = () =>{
    const {history} = this.props;
    // this.props.getUserAddresses(id)
    history.push('/my-addresses')
  }
  render(){
    const {classes} = this.props
    return(
      <div className="addressInfo">
        <LocationOnTwoToneIcon className={classes.iconStyle}/>
        <div>
            <h4>My Addresses</h4>
            <h5>Manage your addresses</h5>
        </div>
        <div className="ordersInfo__btn">
          <Button variant="outlined" className={classes.btnStyle}
                  startIcon={<EventNoteIcon fontSize='small'/>}
                  onClick={()=>this.goToAddresses()}>
              Manage
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

export default connect(null, {getUserAddresses})(withRouter(withStyles(styles)(UserAddresses)));