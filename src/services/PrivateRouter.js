import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({component:Component, isAuth, ...rest}) =>(
  <Route {...rest}
    render = { props =>{
      if(isAuth){
        return <Component {...props}/>
      }else{
        return <Redirect to='/' />
      }
    }
  }
  />
)

const mapStateToProps = state => ({
    isAuth: state.authReducer.isAuthenticated
})

export default connect(mapStateToProps)(PrivateRoute)