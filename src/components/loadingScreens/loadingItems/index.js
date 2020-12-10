import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import './LoadingItems.css';

class LoadingItems extends React.Component{

  render(){
    return(
      <div className="item__load">
        {[...Array(8)].map((e,index) => (
        <div className="item__load__container whiteShadeBackground" key={index}> 
          <Skeleton variant="rect" width={160} height={150} />
          <Skeleton variant="text" width={160} />
          <Skeleton variant="text" width={160}/>
          <Skeleton variant="text" width={160}/>
        </div> 
        ))}
      </div>
    )
 }
}

export default LoadingItems;