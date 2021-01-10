import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="footer__container">
                    <div className="col-md-3 footer-grid">
                        <h3>About Us</h3>
                        <p>Hey this is Hubete</p>
                    </div>
                    <div className="col-md-3 footer-grid ">
                        <h3>Top Categories</h3>
                        <ul>
                            <li><Link>Grocery</Link></li>
                            <li><Link>Optics</Link></li>
                            <li><Link>Electronics</Link></li>
                            <li><Link>Household</Link></li>
                            <li><Link>Clothing</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-3 footer-grid ">
                        <h3>Customer Services</h3>
                        <ul>
                            <li><Link>Disclaimer</Link></li>
                            <li><Link>Faqs</Link></li>
                            <li><Link>Privacy & Policy</Link></li>
                            <li><Link>Terms &amp; Conditions</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-3 footer-grid">
                        <h3>My Account</h3>
                        {!this.props.isAuthenticated?
                        <ul>
                          <li><Link to="/login">Login</Link></li>
                          <li><Link to="/register">Register</Link></li>     
                          <li><Link to="/register">Help</Link></li>                           
                        </ul>
                        :
                        <ul>
                          <li><Link to="/profile">My Profile</Link></li>
                          <li><Link to="/my-addresses">My Addresses</Link></li>     
                          <li><Link to="">Help</Link></li>                           
                        </ul>
                        }

                    </div>
                    <div className="clearfix" />
                    <div className="footer-bottom">
                        <ul className="social-fo">
                            <li><Link to="#" className=" face"><i className="fa fa-facebook" aria-hidden="true" /></Link></li>
                            <li><Link to="#" className=" twi"><i className="fa fa-twitter" aria-hidden="true" /></Link></li>
                            <li><Link to="#" className=" pin"><i className="fa fa-pinterest-p" aria-hidden="true" /></Link></li>
                            <li><Link to="#" className=" dri"><i className="fa fa-dribbble" aria-hidden="true" /></Link></li>
                        </ul>
                        <div className=" address">
                            <div className="col-md-4 fo-grid1">
                                <p><i className="fa fa-home" aria-hidden="true" />Pune, India.</p>
                            </div>
                            <div className="col-md-4 fo-grid1">
                                <p><i className="fa fa-phone" aria-hidden="true" />+91 9764097982</p>
                            </div>
                            <div className="col-md-4 fo-grid1">
                                <p><Link to="/gmail.com"><i className="fa fa-envelope-o" aria-hidden="true" />dipeshyogi94@gmail.com</Link></p>
                            </div>
                            <div className="clearfix" />
                        </div>
                    </div>
                    <div className="copy-right">
                        <p> © 2020 MyEcom. All Rights Reserved</p>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated
})

export default connect(mapStateToProps)(Footer);