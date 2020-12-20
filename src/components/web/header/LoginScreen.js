import React from 'react';
import './header.css';
import TextField from '@material-ui/core/TextField';
import {withStyles, Button} from '@material-ui/core';
import {loginUser} from '../../../actions/authActions';
import {connect} from 'react-redux';

class LoginScreen extends React.Component{
  state={
    email: '',
    password: ''
  }

  onLoginClick = (email, password) =>{
    this.props.closeLoginScreen()
    this.props.loginUser(email, password)
  }

  render(){
    const {classes} = this.props;
    const {email, password} = this.state;

    return(
      <div className="login__container">
        <div className="login__header blueShadeBackground">
          <div className="login__header__img">
            <img src={require("../../../assets/myecom.png")} height='90' />
          </div>
          <h3>Login</h3>
        </div>
        <div className="login__input">
         <TextField 
          label="Email" 
          value = {email}
          onChange = {(e)=> this.setState({email:e.target.value})}
          InputProps={{
            className:classes.inputStyle
          }}
          InputLabelProps={{
            className:classes.textStyles
          }}
          />

          <TextField 
            label="Password" 
            type = "password"
            value = {password}
            onChange = {(e)=> this.setState({password:e.target.value})}
            InputProps={{
              className:classes.inputStyle
            }}
            InputLabelProps={{
              className:classes.textStyles
            }}
          />

          <Button 
            variant="contained" 
            color="primary" 
            className={classes.btnStyles}
            onClick={()=>this.onLoginClick(email, password)}>
            Login
          </Button>
          
          <div>
            <Button 
              className={classes.btnStyles1}
              onClick={()=>{
                this.props.gotoRegisterScreen()
              }}
            >
              Dont have an account? Register here
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

const styles = (theme) => ({
  inputStyle:{
    height:30,
    width:300,
    fontSize:16,
    fontFamily:'Sora',
    marginBottom:5
  },
  textStyles:{
    fontSize:15
  },
  btnStyles:{
    height: 35,
    width:300,
    fontSize:12,
    backgroundColor:'#D2452D',
    "&:hover":{
        backgroundColor:'#D2452D'
    },
    marginTop:40
  },
  btnStyles1:{
    fontSize:11,
    fontFamily: 'Sora'
  }
})

export default connect(null, {loginUser})(withStyles(styles)(LoginScreen));