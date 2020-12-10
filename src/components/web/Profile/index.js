import React from 'react';
import './Profile.css'
import UserInfo from './UserInfo';
import UserAddresses from './UserAddresses';
import UserOrders from './UserOrders';
import PaymentInfo from './PaymentInfo';

class Profile extends React.Component{
    render(){
        return(
            <div className="profile grayShadeBackground">
                <h2>Profile</h2>
                <div className="profile1">
                    <UserInfo />
                    <UserOrders/>
                </div>
                <div className="profile2">
                    <UserAddresses/>
                    <PaymentInfo/>
                </div>
            </div>
            )
    }
}

export default Profile;