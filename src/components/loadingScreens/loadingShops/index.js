import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import './LoadingShops.css';

class LoadingShops extends React.Component{

  render(){
    return(
      <div className="shop__load">
        {[...Array(4)].map((e,index) => (
        <div className="shop__load__container whiteShadeBackground" key={index}> 
          <Skeleton variant="rect" width={120} height={140} />
            <div className="shop__load__info">
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
            </div>
        </div> 
        ))}
      </div>
    )
 }
}

export default LoadingShops;