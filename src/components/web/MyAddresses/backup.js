import React from 'react';
import './MyAddresses.css';
import { getLocation } from '../../../services/LocationServices';
import {getLocationFromCoordinates} from '../../../actions/profileActions';
import {connect} from 'react-redux';
import {Button, Modal, withStyles} from '@material-ui/core';
import AddLocationOutlinedIcon from '@material-ui/icons/AddLocationOutlined';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import LocationOnIcon from '@material-ui/icons/LocationOn';

class MyAddresses extends React.Component{
    state={
        addresses: [
          {name:"Harpal Sharma", location:"Ward no 59, Goga Road, Near Vipin,Rajasthan",
           pin:"411028", landmark:"Kiryana Store", phno:"+91-987726344", active:true },
          {name:"Harpal Sharma", location:"Pakyong Namcheypong, Rajasthan",
           pin:"411048", landmark:"Police station", phno:"+91-987726344", active:false },
          {name:"Dipesh Yogi", location:"Tumin, Samdong, East Sikkim ",
          pin:"411066", landmark:"Gumpa station", phno:"+91-987123344", active:false },
        ],
      addAddress: false
      }

    componentDidMount(){
        getLocation().then(
            (data) => {
                this.props.getLocationFromCoordinates(data.latitude, data.longitude)
            }
        ).catch(err =>{
            console.log(err)
        })
    }

    render(){
        const {currAddr, classes} = this.props

        return(
            <div className="myaddress grayShadeBackground">
              <div className="myaddress__header">
                <h2>My Addresses</h2>
                <Button
                  variant="contained"
                  startIcon={<AddLocationOutlinedIcon/>}
                  className={classes.btnStyle}
                  onClick={()=> this.setState({addAddress: true})}
                >
                  Add new address
                </Button>
              </div>
              <div className="myaddress__info">
                <div className="myaddress__info__current whiteShadeBackground">
                  <MyLocationIcon fontSize='large'/>
                  <div>
                    <div>
                      <h4> Current Address</h4>
                      <h5>Country: {currAddr.country}</h5>
                      <h5>State: {currAddr.state}</h5>
                      <h5>Locality: {currAddr.locality}</h5>
                    </div>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.btnStyle}
                    >
                      Select
                    </Button>
                  </div>         
                </div>
                {this.state.addresses.map((addr)=>(
                  <div className="myaddress__info__current whiteShadeBackground">
                      <LocationOnIcon fontSize='large'/>
                      <div>
                        <div>
                          <h4>{addr.name}</h4>
                          <h5>{addr.location}</h5>
                          <h5>{addr.landmark}</h5>
                          <h5>{addr.pin}</h5>
                          <h5>{addr.phno}</h5>
                        </div>
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.btnStyle}
                        >
                          Select
                        </Button>
                      </div>         
                  </div>
                ))}
              </div>
              <Modal
                className={classes.modalStyles}
                open = {this.state.addAddress}
              > 
                <div  className={classes.modalContent}>
                  <h4 className="addAddress__title">Add Address</h4>
                  <div className={classes.modalContent2}>
                    <div className="addAddress"> 
                      <div className="addAddress__inputs">
                        <h5>Pincode</h5>
                        <div className="addAddress__inputs__fields">
                          <input placeholder="Enter pin-code...."/>
                        </div>
                      </div>
                      <div className="addAddress__inputs">
                        <h5>City</h5>
                        <div className="addAddress__inputs__fields">
                          <input placeholder="Enter city...."/>
                        </div>
                      </div>
                      <div className="addAddress__inputs">
                        <h5>State</h5>
                        <div className="addAddress__inputs__fields">
                          <input placeholder="Enter state...."/>
                        </div>
                      </div>
                      <div className="addAddress__inputs">
                        <h5>First Name</h5>
                        <div className="addAddress__inputs__fields">
                          <input placeholder="Enter first-name...."/>
                        </div>
                      </div>
                    </div>
                    <div className="addAddress"> 
                      <div className="addAddress__inputs">
                        <h5>Last Name</h5>
                        <div className="addAddress__inputs__fields">
                          <input placeholder="Enter last-name...."/>
                        </div>
                      </div>
                      <div className="addAddress__inputs">
                        <h5>Address</h5>
                        <div className="addAddress__inputs__fields">
                          <input placeholder="Enter address...."/>
                        </div>
                      </div>
                      <div className="addAddress__inputs">
                        <h5>Landmark</h5>
                        <div className="addAddress__inputs__fields">
                          <input placeholder="Enter landmark...."/>
                        </div>
                      </div>
                      <div className="addAddress__inputs">
                        <h5>Phone number</h5>
                        <div className="addAddress__inputs__fields">
                          <input placeholder="Enter phone number...."/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="btn_section">
                    <Button variant='outlined' className={classes.btnStyle2}>
                      Save
                    </Button>
                    <Button variant='outlined' className={classes.btnStyle2}
                            onClick={()=>this.setState({addAddress:false})}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Modal>
            </div>
        )
    }
}

const mapStateToProps = state =>({
    currAddr: state.authReducer.currAddr
})

const styles = (theme) =>({
  btnStyle:{
    backgroundColor:'#D2452D',
    "&:hover":{
        backgroundColor:'#D2452D'
    },
    borderRadius: 20,
    height:30,
    marginTop:10,
    color:'#ffff',
    fontFamily:'Sora'
  },
  btnStyle2:{
    backgroundColor:'#D2452D',
    "&:hover":{
        backgroundColor:'#D2452D'
    },
    height:30,
    marginTop:10,
    color:'#ffff',
    fontFamily:'Sora'
  },
  modalStyles:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:50
  },
  modalContent:{
    backgroundColor: theme.palette.background.paper,
    border: '0px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3), 
    borderRadius: 15,
    height:400,
    width:800,
    display: 'flex',
    // justifyContent:'center',
    alignItems: 'center',
    flexDirection:'column',
},
  modalContent2:{
    display: 'flex',
    flexDirection:'row',
    width: '100%',
    justifyContent:'space-around'

  }
})

export default connect(mapStateToProps,{getLocationFromCoordinates})(withStyles(styles)(MyAddresses));