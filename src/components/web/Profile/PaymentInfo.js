import React from 'react';
import './Profile.css'
import PaymentTwoToneIcon from '@material-ui/icons/PaymentTwoTone';
import {withStyles} from '@material-ui/core';

class PaymentInfo extends React.Component{
    render(){
        const {classes} = this.props
        return(
            <div className="paymentInfo">
                <PaymentTwoToneIcon className={classes.iconStyle}/>
                <div>
                    <h4>Payment options</h4>
                    <h5>Add/Edit payment methods</h5>
                </div>
            </div>
            )
    }
}

const styles = () =>({
    iconStyle:{
        fontSize: 100
    }
})

export default withStyles(styles)(PaymentInfo);