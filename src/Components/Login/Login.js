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
    'email':'',
    'password':''
  })

  const login = () => {
    axiosInstance.post('auth/login',user)
    .then((response) => {
      setOpen(false)
      localStorage.setItem('token',response.data.token)
    })
  } 

  return (
    <div>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleModalOpen}
      >
        <Icon style={{fontWeight:700}}>input</Icon>
      </IconButton>
      <Modal
        open={open}
        className={classes.modal}
        onClose={() => setOpen(false)}
      >
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography variant="h4" noWrap className={classes.header}>
              Sign in
            </Typography>
            <Divider />
            <form className={classes.form} noValidate autoComplete="off">
              <TextField
                value={user.email}
                onChange={(evt)=> setUser({...user, email:evt.target.value})}
                id="standard-email"
                label="Email"
                type="email"
              />
              <TextField
                value={user.password}
                onChange={(evt)=> setUser({...user, password:evt.target.value})}
                id="standard-pass"
                label="Password"
                type="password"
              />
            </form>
          </CardContent>
          <Divider />
          <CardActions >
            <div className={classes.action}>
              <Button 
                onClick={() => login()}
                variant="contained" 
                className={classes.loginBtn}>LogIn</Button>
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
  loginBtn:{
    backgroundColor:'#319a2f',
    color:'white',
    fontWeight:'bold'
  }
}));