import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeScreen from './home/home-info';
import Header from './header';
import Footer from './footer';
import NotFound from '../nomatch'
// import Login from '../auth/login';
// import Register from '../auth/register';
import Cart from './cart';
import ShopListByCat from './ShopListByCat';
import ShopItems from './ShopItems';
import Profile from './Profile';
import MyOrders from './MyOrders';
import OrderDetails from './OrderDetails';
import ScrollIntoView from '../../services/ScrollIntoView';
import MyAddresses from './MyAddresses';
import AllCategories from './AllCategories';
import MyInfo from './MyInfo';
import OrderConfirm from './OrderConfirm';
import Alert from '../Alert.js';
import PrivateRouter from '../../services/PrivateRouter';

export default class Main extends Component {
  render() {
      return (
        <main>
          <div className="wrapper">
            <ScrollIntoView>
              {/* {
                this.props.location.pathname !== '/login' && this.props.location.pathname !== '/register'
                && <Header/>
              }  */}
              <Header/>
              <Alert/>
              <Switch>
                <Route exact path='/' component={HomeScreen} />
                {/* <Route path='/login' component={Login} /> */}
                {/* <Route path='/register' component={Register} /> */}
                <PrivateRouter path='/carts' component={Cart} />
                <PrivateRouter path='/profile' component={Profile} />
                <Route path='/shop-category' component={ShopListByCat} />
                <Route path='/all-categories' component={AllCategories} />
                <Route path='/shop-items' component={ShopItems} />
                <PrivateRouter path='/my-orders' component={MyOrders} />
                <PrivateRouter path='/order-details' component={OrderDetails} />
                <PrivateRouter path='/my-addresses' component={MyAddresses} />
                <PrivateRouter path='/my-info' component={MyInfo} />
                <PrivateRouter path='/order-confirm' component={OrderConfirm} />
                <Route component={NotFound} />
              </Switch>
              {
                this.props.location.pathname !== '/shop-items' &&  <Footer/>
              }
            </ScrollIntoView>
          </div>
        </main>
      );
    }
}