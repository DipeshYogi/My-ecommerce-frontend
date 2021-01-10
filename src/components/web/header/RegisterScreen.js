import React from 'react';
import './header.css';
import TextField from '@material-ui/core/TextField';
import {withStyles, Button} from '@material-ui/core';
import {registerUser} from '../../../actions/authActions';
import {connect} from 'react-redux';


class RegisterScreen extends React.Component{
  state={
    username:'',
    email: '',
    phno:'',
    pass1:'',
    pass2:'',
    nameMsg: '',
    emailMsg: '',
    phnoMsg: '',
    passMsg: '',
  }

  reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  onSubmit=()=>{
      const { access, username, email, phno, pass1, pass2 } = this.state;
      let isnum = /^\d+$/.test(phno);
      let errFlag = false

      if(username.length===0){
          this.setState({nameMsg:"Invalid username"})
          errFlag = true
      }else{
          this.setState({nameMsg:""})
      }

      if(this.reg.test(email) === false){
          this.setState({emailMsg:"Invalid email"})
          errFlag = true
      }else{
          this.setState({emailMsg:""})
      }

      if(!isnum || phno.length<10 || phno.length>12){
          this.setState({phnoMsg:"Invalid mobile number"})
          errFlag = true
      }else{
          this.setState({phnoMsg:""})
      }

      if(pass1!==pass2 && pass1.length!==0){
          this.setState({passMsg:"Passwords do not match"})
          errFlag = true
      }else if(pass1.length<5){
          this.setState({passMsg:"Set a strong password"})
          errFlag = true
      }else{
          this.setState({passMsg:""})
      }

      const{ nameMsg, emailMsg, phnoMsg, passMsg } = this.state;
      const newUser = { access, email, phno, username, pass1 }

      if(errFlag === false){
          this.props.registerUser(newUser)
          this.props.closeRegisterScreen()
      }
    }   

  render(){
    const {classes} = this.props;
    return(
      <div className="register__container">
        <div className="register__header blueShadeBackground">
          <div className="register__header__img">
            <img src={require("../../../assets/myecom.png")} height='90' />
          </div>
          <h3>Register</h3>
        </div>
        <div className="register__input">
         <div>
          <TextField 
            label="Username" 
            value={this.state.username}
            onChange = {e=>this.setState({username:e.target.value})}
            error = {this.state.nameMsg===""? false:true}
            InputProps={{
              className:classes.inputStyle
            }}
            InputLabelProps={{
              className:classes.textStyles
            }}
            />
          {this.state.nameMsg.length>0?<p className="errorStyles">{this.state.nameMsg}</p>:null}
         </div>

         <div>
          <TextField 
            label="Email" 
            value={this.state.email}
            onChange = {e=>this.setState({email:e.target.value})}
            error = {this.state.emailMsg===""? false:true}
            type="email"
            InputProps={{
              className:classes.inputStyle
            }}
            InputLabelProps={{
              className:classes.textStyles
            }}
          />
          {this.state.emailMsg.length>0?<p className="errorStyles">{this.state.emailMsg}</p>:null} 
         </div>

         <div>
          <TextField 
            label="Phone" 
            value={this.state.phno}
            onChange = {e=>this.setState({phno:e.target.value})}
            error = {this.state.phnoMsg===""? false:true}
            InputProps={{
              className:classes.inputStyle
            }}
            InputLabelProps={{
              className:classes.textStyles
            }}
          />
          {this.state.phnoMsg.length>0?<p className="errorStyles">{this.state.phnoMsg}</p>:null}
         </div>

         <div>
          <TextField 
              label="Password1" 
              value={this.state.pass1}
              onChange = {e=>this.setState({pass1:e.target.value})}
              type = "password"
              error = {this.state.passMsg===""? false:true}
              InputProps={{
                className:classes.inputStyle
              }}
              InputLabelProps={{
                className:classes.textStyles
              }}
            />
         </div>
         
         <div>
          <TextField 
              label="Password2" 
              value={this.state.pass2}
              onChange = {e=>this.setState({pass2:e.target.value})}
              error = {this.state.passMsg===""? false:true}
              type = "password"
              InputProps={{
                className:classes.inputStyle
              }}
              InputLabelProps={{
                className:classes.textStyles
              }}
          />
          {this.state.passMsg.length>0?<p className="errorStyles">{this.state.passMsg}</p>:null}
         </div>

         <Button variant="contained" color="primary" className={classes.btnStyles}
              onClick={()=> this.onSubmit()}>
           Register
         </Button>
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
    marginTop:30
  },
  btnStyles1:{
    fontSize:11,
    fontFamily: 'Sora'
  }
})

export default connect(null,{registerUser})(withStyles(styles)(RegisterScreen));