import React from 'react';
import './MyAddresses.css';
import TextField from '@material-ui/core/TextField';
import {withStyles, Button} from '@material-ui/core';
import {addUserAddress, updateUserAddress} from '../../../actions/profileActions';
import {connect} from 'react-redux';


class AddAddress extends React.Component{
  state = {
    id: '',
    address1:'',
    address2:'',
    pincode:'',
    phone:'',
    is_active:''  
  }

  componentDidMount(){
    if (this.props.address){
      const {id, address1, address2, pincode, phone, is_active} = this.props.address
      this.setState({id:id, address1:address1, address2:address2, pincode:pincode,  
                    phone:phone, is_active:is_active})
    }
  }

  addressAction = () =>{
    const {id, address1, address2, pincode, phone, is_active} = this.state;
    if(!this.props.edit){
      this.props.addUserAddress(address1, address2, pincode, phone);
    }else{
      this.props.updateUserAddress(id, address1, address2, pincode, phone, is_active);
    }
  
    this.props.closeScreen();
  }

  render(){
    const {classes} = this.props;
    var title = <h3>Add Address</h3>
    if(this.props.edit){
      title = <h3>Edit Address</h3>
    }

    return(
      <div className="add__container">
        <div className="add__header">
          {title}
        </div>
        <div className="add__input">
         <TextField 
          label="Address1" 
          value={this.state.address1}
          onChange={(e)=>this.setState({address1: e.target.value})}
          InputProps={{
            className:classes.inputStyle
          }}
          InputLabelProps={{
            className:classes.textStyles
          }}
          />

         <TextField 
          label="Address2" 
          value={this.state.address2}
          onChange={(e)=>this.setState({address2: e.target.value})}
          InputProps={{
            className:classes.inputStyle
          }}
          InputLabelProps={{
            className:classes.textStyles
          }}
          />

          {/* <TextField 
            label="Landmark" 
            value={this.state.landmark}
            onChange={(e)=>this.setState({landmark:e.target.value})}
            InputProps={{
              className:classes.inputStyle
            }}
            InputLabelProps={{
              className:classes.textStyles
            }}
          /> */}

          <TextField 
            label="Pincode" 
            value={this.state.pincode}
            onChange={(e)=>this.setState({pincode:e.target.value})}
            InputProps={{
              className:classes.inputStyle
            }}
            InputLabelProps={{
              className:classes.textStyles
            }}
          />

          <TextField 
            label="Phone" 
            value={this.state.phone}
            onChange={(e)=>this.setState({phone:e.target.value})}
            InputProps={{
              className:classes.inputStyle
            }}
            InputLabelProps={{
              className:classes.textStyles
            }}
          />

          <Button 
            variant="contained"
            color="primary" 
            className={classes.btnStyles}
            onClick={()=> this.addressAction()}>
            {this.props.address?'Edit Address':'Add Address'}            
          </Button>
        </div>
      </div>
    )
  }
}

const styles = (theme) => ({
  inputStyle:{
    height:30,
    width:300,
    fontSize:16,
    fontFamily:'Sora',
    marginBottom:5
  },
  textStyles:{
    fontSize:15
  },
  btnStyles:{
    height: 35,
    width:300,
    fontSize:12,
    backgroundColor:'#D2452D',
    "&:hover":{
        backgroundColor:'#D2452D'
    },
    marginTop:40
  },
  btnStyles1:{
    fontSize:11,
    fontFamily: 'Sora'
  }
})

export default connect(null, {addUserAddress, updateUserAddress})(withStyles(styles)(AddAddress));