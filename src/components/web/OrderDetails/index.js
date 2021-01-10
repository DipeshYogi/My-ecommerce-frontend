import React from 'react';
import './OrderDetails.css';
import {connect} from 'react-redux';


class OrderDetails extends React.Component{
    state = {
        cart: [{Item:'Parle-G', Qty:5, Cost:10},
               {Item:'Nescafe', Qty: 10, Cost:120},
               {Item:'Gerry Crackers', Qty:3, Cost:50},    
               {Item:'Tomatos', Qty:1, Cost:70}, 
               {Item:'Onion', Qty:2, Cost:70}, 
               {Item:'Banana', Qty:4, Cost:20},             
            ],
        headerInfo: [],
        linesInfo:[]
         }
    
    componentDidMount(){
      let header = this.props.orders.HeaderInfo.find(ord => ord.HORD === this.props.location.HORD)
      let lines = this.props.orders.LineInfo.filter(lin => lin.LORD === this.props.location.HORD)
      if(header && lines){
        this.setState({headerInfo: header, linesInfo: lines})
      }   
    }

    render(){
        const {headerInfo, linesInfo} = this.state;
        return(
            <div className="orderdetails">
              <div className="orderdetails__info1">
                <h3>Order Details</h3>
                <div>
                  <h4>Order Number</h4>
                  <p>ORD #{headerInfo.HORD}</p>
                </div>
                <div>
                  <h4>Shipment Number</h4>
                  <p>#123111-123102938A</p>
                </div>
                <div>
                  <h4>Order Date</h4>
                  <p>{headerInfo.HEDTE}</p>
                </div>
                <div>
                  <h4>Order Amount</h4>
                  <p>₹ {linesInfo.reduce((accum, lin)=> accum + lin.LPRIC, 0)}</p>
                </div>
                <div>
                  <h4>Invoice Number</h4>
                  <p>TH0000987712</p>
                </div>
                <div>
                  <h4>Invoice Amount</h4>
                  <p>₹ 
                  {linesInfo.reduce((accum, lin)=> accum + lin.LPRIC, 0) - 
                  linesInfo.reduce((accum, lin)=> accum + lin.LDISC, 0)}
                  </p>
                </div>
                <div>
                  <h4>Payment Type</h4>
                  <p>Cash On Delivery</p>
                </div>
              </div>   

              <div className="orderdetails__info2">
                <h3>Order Items ({linesInfo.length})</h3>
                {linesInfo.map(itm => (
                <div>
                  <img src="https://static.thenounproject.com/png/1434570-200.png" height={60} />
                  <div> 
                    <h5>{itm.LPROD}</h5>
                    <h6>₹ {itm.LPRIC}</h6>
                    <p>Qty: {itm.LQORD}</p>
                  </div>
                </div>
                ))}
              </div>           

              <div className="orderdetails__info3">
                <h3>Delivery Address</h3>
                <div>
                  <p>
                    Ward No 59, Goga Madi Road, Neap Vipin Kiryana Store
                    Rest of India RAJASTHAN 223371
                  </p>
                </div>
              </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
  orders: state.orderReducer.userorders.data
})

export default connect(mapStateToProps)(OrderDetails);
