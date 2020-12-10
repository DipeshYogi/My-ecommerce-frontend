import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import './LoadingHome.css';

class LoadingHomeCats extends React.Component{
  render(){
    const {start, end} = this.props;
    return(
      <div className="container">
        <div className="cat__load">
          {[...Array(end-start)].map((e,index) => (
          <div className="cat__load__container whiteShadeBackground" key={index}> 
            <Skeleton variant="rect" width={350} height={190} />
            <Skeleton variant="text" width={350} />
            <Skeleton variant="text" width={350}/>
          </div> 
          ))}
        </div>
      </div>
    )
 }
}

export default LoadingHomeCats;