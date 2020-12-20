import React from 'react';
import './MyAddresses.css';
import { getLocation } from '../../../services/LocationServices';
import {getLocationFromCoordinates} from '../../../actions/profileActions';
import {connect} from 'react-redux';
import {Button, Radio, withStyles, Checkbox} from '@material-ui/core';
import AddLocationOutlinedIcon from '@material-ui/icons/AddLocationOutlined';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import AddAddress from './AddAddress';
import {deleteUserAddress, updateActiveAddress, getUserAddresses} from '../../../actions/profileActions'; 


class MyAddresses extends React.Component{
  state={
    addresses: [],
    addAddress: false,
    editAddress: false,
    addrToEdit:{}
  }

  componentDidMount(){
    this.props.getUserAddresses(this.props.user.userdata.id)
    getLocation().then(
        (data) => {
            this.props.getLocationFromCoordinates(data.latitude, data.longitude)
        }
        ).catch(err =>{
            console.log(err)
        })
    }
  
  componentDidUpdate = (prevProps, prevState) =>{
    if(prevState.addresses !== this.props.addresses){
      this.setState({addresses: this.props.addresses})
    }
  }

  closeAddressScreen = () =>{
    this.setState({addAddress:false, editAddress:false})
  }

  changeActiveAddress = (id, is_active) => {
    if(!is_active){
    this.props.updateActiveAddress(id);
    }
  }

  render(){
    const {currAddr, classes} = this.props;

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
              <h4> Current Address</h4>
              <div>
                <h5>Country: {currAddr.country}</h5>
                <h5>State: {currAddr.state}</h5>
                <h5>Locality: {currAddr.locality}</h5>
              </div>
            </div>         
          </div>

          <div className="myaddress__addr whiteShadeBackground">
            <div className="myaddress__addr__content">
            {this.state.addresses.sort((a,b)=>(b.id - a.id)).map(add => (
              <div className="myaddress__addr__info"> 
                <Checkbox
                  checked={add.is_active}
                  onChange = {()=>this.changeActiveAddress(add.id, add.is_active)}
                />
                <div>
                  <h4>{add.address1}</h4>
                  <div>
                    <h6>{add.address2}</h6>
                    <h6>{add.pincode}</h6>
                    <h6>{add.phone}</h6>
                  </div>
                </div>
                <div className="myaddress__addr__btn">
                  <Button className={classes.btnStyle1}
                      onClick={()=>
                              this.setState({editAddress:true, addrToEdit:add})
                              }>
                    Edit
                  </Button>
                </div>
                <div className="myaddress__addr__btn2">
                  <Button
                    className={classes.btnStyle2}
                    onClick={()=> 
                      this.props.deleteUserAddress(add.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>

        {/* Add Address */}
        <div>
          <Dialog
            open={this.state.addAddress}
            onClose={()=>this.setState({addAddress:false})}          
          > 
            <AddAddress closeScreen={this.closeAddressScreen}/>
            <div className="modal__close">
              <Button onClick={()=>this.setState({addAddress:false})}>
                <CloseIcon style={{fontSize:25, color:"black"}}/>
              </Button>
            </div>
          </Dialog>
        </div>

        {/* Edit Address */}
        <div>
          <Dialog
            open={this.state.editAddress}
            onClose={()=>this.setState({editAddress:false})}          
          > 
            <AddAddress 
              closeScreen={this.closeAddressScreen}
              edit={true}
              address={this.state.addrToEdit}/>
            <div className="modal__close">
              <Button onClick={()=>this.setState({editAddress:false})}>
                <CloseIcon style={{fontSize:25, color:"black"}}/>
              </Button>
            </div>
          </Dialog>
        </div>
      </div>
     )
    }
}

const mapStateToProps = state =>({
    currAddr: state.authReducer.currAddr,
    addresses: state.profileReducer.addr,
    user: state.authReducer.userdata.data
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
    fontFamily:'Sora',
    fontSize: 14
  },
  btnStyle1:{
    fontSize:14,
    color: 'blueviolet',
    "&:hover":{
      backgroundColor:'#FFFF'
    }
  },
  btnStyle2:{
    fontSize:14,
    color: 'green',
    "&:hover":{
      backgroundColor:'#FFFF'
    }
  }
})

export default connect(mapStateToProps,{getLocationFromCoordinates, deleteUserAddress, getUserAddresses,
               updateActiveAddress})(withStyles(styles)(MyAddresses));