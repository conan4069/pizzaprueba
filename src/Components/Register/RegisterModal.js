import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import {axiosInstance} from '../../axiosInstance'


export default (props) => {
  const handleModalOpen = () => {
    setOpen(true);
  }
  const classes = useStyles()
  // Variables
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState({
    'name':'',
    'email':'',
    password:'',
    password_confirmation:'',
    address:'',
    cellphone:''
  })

  const createUser = () => {
    axiosInstance.post('auth/signup',user)
    .then((response) => {
      setOpen(false)
    })
  } 

  return (
    <div>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleModalOpen}
      >
        <Icon className="fa fa-user-alt" />
      </IconButton>
      <Modal
        open={open}
        className={classes.modal}
        onClose={() => setOpen(false)}
      >
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography variant="h4" noWrap className={classes.header}>
              Sign up
            </Typography>
            <Divider />
            <form className={classes.form} noValidate autoComplete="off">
              <TextField
                value={user.name}
                onChange={(evt)=> setUser({...user,name:evt.target.value})}
                id="standard-name"
                label="Name"
                type="text"
              />
              <TextField
                value={user.email}
                onChange={(evt)=> setUser({...user, email:evt.target.value})}
                id="standard-email"
                label="Email"
                type="email"
              />
              <TextField
                value={user.cellphone}
                onChange={(evt)=> setUser({...user, cellphone:evt.target.value})}
                id="standard-phone"
                label="Phone"
                type="number"
              />
              <TextField
                value={user.address}
                onChange={(evt)=> setUser({...user, address:evt.target.value})}
                id="standard-address"
                label="Address"
                type="text"
              />
              <TextField
                value={user.password}
                onChange={(evt)=> setUser({...user, password:evt.target.value})}
                id="standard-pass"
                label="Password"
                type="password"
              />
              <TextField
                value={user.password_confirmation}
                onChange={(evt)=> setUser({...user, password_confirmation:evt.target.value})}
                id="standard-pass-2"
                label="Password confirmation"
                type="password"
              />
            </form>
          </CardContent>
          <Divider />
          <CardActions >
            <div className={classes.action}>
              <Button 
                onClick={() => createUser()}
                variant="contained" 
                className={classes.registerBtn}>Register</Button>
            </div>
          </CardActions>
        </Card>
      </Modal>
    </div>
  )

}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    minWidth: 375
  },
  form: {
    display: 'grid'
  },
  header:{
    flexGrow: 1,
    fontFamily:'Pacifico , cursive',
    fontWeight:'700',
    color:'#319a2f',
    textAlign:'center',
    paddingBottom:15,
    fontSize:'35px'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 2,
  },
  action:{
    display:'flex',
    width:'100%',
    alignItems:'center',
    justifyContent:'flex-end'
  },
  registerBtn:{
    backgroundColor:'#319a2f',
    color:'white',
    fontWeight:'bold'
  }
}));