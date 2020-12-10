import React, { Component } from 'react'
import { Button, withStyles, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom'
import './login.css';


class Login extends Component {
    render() {
        const { classes } = this.props
        return (
            <div className="login_screen">
                <div className="login whiteShadeBackground">
                    <div className="login__logo">
                       <Link to='/'><img src={require("../../../assets/Icon.png")} height='55' /></Link> 
                    </div>
                    <div className="login__view">
                        <div className="login__title">
                            <h2>Login</h2>
                        </div>
                        <div className="login__field">
                            <h5>Username</h5>
                            <div className="login__field__input">
                                <input type="text" placeholder="Enter username...."/>
                            </div>
                        </div>
                        <div className="login__field">
                            <h5>Password</h5>
                            <div className="login__field__input">
                                <input type="password" placeholder="Enter password...."/>
                            </div>
                        </div>
                        <div className="login__submit">
                             <Button variant='outlined' className={classes.btnStyle}>Login</Button>
                        </div>
                        <div className="login__register">
                            <p style={{fontSize:10}}>Dont have account? </p>
                            <Link to='/register' style={{fontSize:11, cursor:'pointer'}}>Register</Link>
                        </div>
                    </div>

                </div>
            </div>

        )
    }
}

const styles = (theme) =>({
  btnStyle :{
      backgroundColor: '#D2452D',
      color: '#FFFF',
      "&:hover":{
          backgroundColor:'#D2452D'
      },
  }
})

export default withStyles(styles)(Login);