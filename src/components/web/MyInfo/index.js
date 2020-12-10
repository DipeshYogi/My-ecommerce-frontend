import React, {useState} from 'react';
import './MyInfo.css';
import { Button, makeStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import {connect} from 'react-redux';


const MyInfo = ({user}) =>{
  const [username, setName] = useState(user.name)
  const [email, setMail] = useState(user.email)
  const [mobno, setMob] = useState(user.mobile)
  const [editMode, setEditMode] = useState(false)
  const classes = useStyles()                                  

  return(
    <div className="myinfo grayShadeBackground">
      <div className="myinfo__content whiteShadeBackground">
        <div className="myinfo__content__inp">
          <h4>Username</h4>
          <div>
            <input placeholder="Username..." readOnly={editMode?false:true} value={username}
                   className={editMode?"myinfo__inp":"myinfo__inp1"} 
                   onChange={(e)=> setName(e.target.value)}/>
          </div>
        </div>
        <div className="myinfo__content__inp">
          <h4>Email</h4>
          <div>
            <input placeholder="Email..." readOnly={editMode?false:true} value={email}
                   className={editMode?"myinfo__inp":"myinfo__inp1"}
                   onChange={(e)=> setMail(e.target.value)}/>
          </div>
        </div>
        <div className="myinfo__content__inp">
          <h4>Mobile number</h4>
          <div>
            <input placeholder="Mobile no..." readOnly={editMode?false:true} value={mobno}
                   className={editMode?"myinfo__inp":"myinfo__inp1"}
                   onChange={(e)=> setMob(e.target.value)}/>
          </div>
        </div>
        {!editMode?
          <div className="myinfo__content__btn">
          <Button variant="outlined" className={classes.btnStyle} startIcon={<EditIcon/>}
                  onClick={() => setEditMode(true) } >
            Edit
          </Button>
         </div>
         :
         <div className="myinfo__content__btn">
          <Button variant="outlined" className={classes.btnStyle} startIcon={<SaveIcon/>}
                  onClick={() => setEditMode(false)}>
            Save
          </Button>
         </div>
        }

      </div>
    </div>
  )
}

const useStyles = makeStyles({
  btnStyle :{
      backgroundColor: '#D2452D',
      color: '#FFFF',
      "&:hover":{
          backgroundColor:'#D2452D'
      },
      fontSize:12,
      fontFamily:'Sora'
      }
  })

const mapStateToProps = state => ({
  user:state.authReducer.userdata
})

export default connect(mapStateToProps)(MyInfo);