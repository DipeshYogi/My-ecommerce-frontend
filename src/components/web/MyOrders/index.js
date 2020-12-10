import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import './MyOrder.css';
import CurrentOrder from './CurrentOrder';
import PastOrder from './PastOrder';

class MyOrders extends React.Component{
    state={
        value:0,
    }

    handleChange = (e, newValue) =>{
        this.setState({value:newValue})
    }

    render(){
        if(this.state.value === 0){
            var screen = <CurrentOrder/>
        }else{
            var screen = <PastOrder />
        }

        return(
            <div className='myorders'>
                <div className='myorders__tabs'>
                <Tabs value={this.state.value} onChange={this.handleChange}>
                    <Tab label={<span className="tabLabels">CURRENT ORDERS</span>} />
                    <Tab label={<span className="tabLabels">PAST ORDERS</span>} />
                </Tabs>
                </div>
                <div className="myorders__content">
                    {screen}
                </div>
            </div>

        )
    }
}

export default MyOrders;