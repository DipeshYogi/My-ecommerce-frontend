import React from 'react';
import TextField from '@material-ui/core/TextField';
import {withStyles, Button} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {updateUserInfo} from '../../../actions/profileActions';
import {connect} from 'react-redux';


class EditProfile extends React.Component{
  state = {
    genderOptions: [
          {value:'Male', label:'Male'},
          {value:'Female', label:'Female'},
          {value:'Others', label:'Others'}
          ],
    dob: new Date(),
    name:'',
    email:'',
    mobile:''
  }

  handleDateChange = (date) =>{
    this.setState({dob:date})
  }

  componentDidMount(){
    const{name, email, phone} = this.props.user;
    const d_o_b = new Date(this.props.user.date_of_birth);
    this.setState({name:name, email:email, mobile:phone, dob:d_o_b})
  }

  saveChanges = () => {
    const {name, email, mobile, dob} = this.state;
    const userdata = this.props.user;
    if(userdata.name !== name || userdata.email !== email ||
       userdata.phone !== mobile || new Date(userdata.date_of_birth).getDate() !== dob.getDate()
       || new Date(userdata.date_of_birth).getMonth() !== dob.getMonth() || 
       new Date(userdata.date_of_birth).getYear() !== dob.getYear()){
          this.props.updateUserInfo(userdata.id, name, email, mobile, dob)   
          this.props.closeScreen()
       }
  }

  render(){
    const {classes} = this.props;
    const{name, email, mobile} = this.state;

    return(
      <div className="edit__container">
        <h3>Edit Profile</h3>
        <div className="login__input">
         <TextField 
          label="Username" 
          value={name}
          onChange={(e)=> this.setState({name:e.target.value})}
          InputProps={{
            className:classes.inputStyle
          }}
          InputLabelProps={{
            className:classes.textStyles
          }}
          />

          <TextField 
            label="Email Id" 
            value={email}
            onChange={(e)=> this.setState({email:e.target.value})}
            InputProps={{
              className:classes.inputStyle
            }}
            InputLabelProps={{
              className:classes.textStyles
            }}
          />

          <TextField 
            label="Mobile No" 
            value={mobile}
            onChange={(e)=> this.setState({mobile:e.target.value})}
            InputProps={{
              className:classes.inputStyle
            }}
            InputLabelProps={{
              className:classes.textStyles
            }}
          />

          <div className="login__date">
            <div className="login__date__gender">
              <TextField 
                label="Gender" 
                select
                InputProps={{
                  className:classes.inputStyleDte
                }}
                InputLabelProps={{
                  className:classes.textStyles
                }}
              >
                {this.state.genderOptions.map(option=>(
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                format="dd/MM/yyyy"
                margin="normal"
                label="Date of birth"
                value={this.state.dob}
                onChange={this.handleDateChange}
                InputProps={{
                  className:classes.inputStyleDte
                }}
                InputLabelProps={{
                  className:classes.textStyles
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <Button 
            variant="contained"
            color="primary"
            className={classes.btnStyles}
            onClick={()=>this.saveChanges()}
            >
            Save Changes
          </Button>
        </div>
      </div>
    )
  }
}

const styles = (theme) => ({
  inputStyle:{
    height:30,
    width:350,
    fontSize:16,
    fontFamily:'Sora',
    marginBottom:5
  },
  inputStyleDte:{
    height:30,
    width:150,
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
  },

})

const mapStateToProps = state => ({
  user : state.authReducer.userdata.data.userdata
  // user : state.authReducer.userdata.data
})

export default connect(mapStateToProps,{updateUserInfo})(withStyles(styles)(EditProfile));