import React from 'react';
import './Profile.css'
import AccountBoxTwoToneIcon from '@material-ui/icons/AccountBoxTwoTone';
import {withStyles, Button} from '@material-ui/core';
import {connect} from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import EditProfile from './EditProfile';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';


class UserInfo extends React.Component{
    state = {
        editModal: false
    }
    
  closeEditScreen = () =>{
    this.setState({editModal:false})
  }

    render(){
      const {classes} = this.props;
      const {name, email, phone} = this.props.user.userdata;

      return(
        <div className="userInfo">
          <AccountBoxTwoToneIcon className={classes.iconStyle}/>
          <div>
              <h4>My Info</h4>
              <h5>Name: {name}</h5>
              <h5>Email: {email}</h5>
              <h5>Mobile No: {phone}</h5>
          </div>

          <div className="userInfo__btn">
            <Button variant="outlined" className={classes.btnStyle}
                    startIcon={<EditIcon fontSize='small'/>}
                    onClick={()=>this.setState({editModal:true})}>
                Edit
            </Button>
          </div>

          <Dialog
            open={this.state.editModal}
            onClose={()=>this.setState({editModal:false})}          
          >
            <EditProfile closeScreen={this.closeEditScreen}/>
            <div className="edit__close">
              <Button onClick={()=>this.setState({editModal:false})}>
                <CloseIcon style={{fontSize:25, color:"black"}}/>
              </Button>
            </div>
          </Dialog>
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
        width: 90,
        backgroundColor: '#D2452D',
        color: '#FFFF',
        "&:hover":{
            backgroundColor:'#D2452D'
        },
        fontSize:11,
        fontFamily:'Sora'
    }
})

const mapStateToProps = state => ({
    // user : state.authReducer.userdata.data.userdata
    user : state.authReducer.userdata.data 
})

export default connect(mapStateToProps)(withStyles(styles)(UserInfo));