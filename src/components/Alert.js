import React, {Fragment} from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';

class Alerts extends React.Component{

  componentDidUpdate(prevProps){
    const {alert, message} = this.props;   
    if (message !== prevProps.message) {
      if (message.successMsg){
        alert.success(message.successMsg);
      }else if(message.failureMsg){
        alert.error(message.failureMsg);
      }
    }
  }

  render(){
    return <Fragment />;
}
}

const mapStateToProps= state => ({
  message: state.messageReducer.msg
});

export default connect(mapStateToProps)(withAlert()(Alerts));
