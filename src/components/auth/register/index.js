import React, { Component } from 'react'
import './register.css';
import { Button, withStyles } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import {registerUser} from '../../../actions/authActions';
import {connect} from 'react-redux';

class Register extends Component {
    state={
        access: 'ROLE_USER',
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
        }
    }   

    render() {
        const {classes} = this.props
        if(this.props.isAuthenticated === true){
            return  <Redirect to='/' />
        }else{
        return (
            <div className="register_screen">
                <div className="register whiteShadeBackground">
                    <div className="register__logo">
                        <Link to='/'><img src={require("../../../assets/Icon.png")} height='55' /></Link>
                    </div>
                    <div className="register__view">
                        <div className="register__title">
                            <h2>Register</h2>
                        </div>
                        <div className="register__field">
                            <h5>Username</h5>
                            <div className="register__field__input">
                                <input type="text"  value={this.state.username} placeholder="Enter username...."
                                       onChange={(e)=>this.setState({username:e.target.value})}
                                />
                            </div>
                        </div>
                        {this.state.nameMsg.length>0?<p className="errorStyles">{this.state.nameMsg}</p>:null}                       
                        <div className="register__field">
                            <h5>Email</h5>
                            <div className="register__field__input">
                                <input type="text" value={this.state.email} placeholder="Enter email...."
                                       onChange={(e)=>this.setState({email:e.target.value})}
                                />
                            </div>
                        </div>
                        {this.state.emailMsg.length>0?<p className="errorStyles">{this.state.emailMsg}</p>:null}  
                        <div className="register__field">
                            <h5>Mobile No</h5>
                            <div className="register__field__input">
                                <input type="text" value={this.state.phno} placeholder="Enter mobile number.."
                                       onChange={(e)=>this.setState({phno:e.target.value})} 
                                />
                            </div>
                        </div>
                        {this.state.phnoMsg.length>0?<p className="errorStyles">{this.state.phnoMsg}</p>:null}
                        <div className="register__field">
                            <h5>Password</h5>
                            <div className="register__field__input">
                                <input type="text" value={this.state.pass1} placeholder="Enter password...."
                                       onChange={(e)=>this.setState({pass1:e.target.value})} 
                                />
                            </div>
                        </div>
                        <div className="register__field">
                            <h5>Confirm Password</h5>
                            <div className="register__field__input">
                                <input type="text" value={this.state.pass2} placeholder="Enter password again...."
                                       onChange={(e)=>this.setState({pass2:e.target.value})}
                                />
                            </div>
                        </div>
                        {this.state.passMsg.length>0?<p className="errorStyles">{this.state.passMsg}</p>:null}
                        <div className="register__submit">
                             <Button variant='outlined' className={classes.btnStyle}
                                  onClick={()=>this.onSubmit()}
                             >
                                 Register
                            </Button>
                        </div>
                    </div>

                </div>
            </div>

        )}
    }
}

const style = () => ({
  btnStyle :{
      backgroundColor: '#D2452D',
      color: '#FFFF',
      "&:hover":{
          backgroundColor:'#D2452D'
      },
    }
})

const mapStateToProps = state =>({
    isAuthenticated: state.authReducer.isAuthenticated
})

export default connect(mapStateToProps,{registerUser})(withStyles(style)(Register))