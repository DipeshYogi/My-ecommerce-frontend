import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import './TopDeals.css';

class LoadingTopDeals extends React.Component{
  render(){
    return(
      <div className="container">
        <div className="deals__load">
          {[...Array(4)].map((e,index) => (
          <div className="deals__load__container whiteShadeBackground" key={index}> 
            <Skeleton variant="rect" width={290} height={220} />
            <Skeleton variant="text" width={290} />
            <Skeleton variant="text" width={290}/>
          </div> 
          ))}
        </div>
      </div>
    )
 }
}

export default LoadingTopDeals;