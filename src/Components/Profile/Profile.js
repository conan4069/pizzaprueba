import React, { useState, useEffect } from 'react';
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
  const classes = useStyles()
  // Variables
  const [user, setUser] = useState({
    'name':'',
    'email':'',
    password:'',
    password_confirmation:'',
    address:'',
    cellphone:''
  })

  const updateUser = () => {
    axiosInstance.patch('auth/edit_profile',user)
  } 

  useEffect(() => {
    axiosInstance.get('user')
    .then((response) => {
      let userResponse = response.data
      if(userResponse.contact_data !== undefined && userResponse.contact_data !== null){
        userResponse['address'] = userResponse.contact_data['address']
        userResponse['cellphone'] = Number(userResponse.contact_data['cellphone'])
      }
      console.log(userResponse,"Repso");
      
      setUser(userResponse)
    })
  },[])

  return (
    <div className={classes.container}>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h4" noWrap className={classes.header}>
            Profile
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
              onClick={() => updateUser()}
              variant="contained" 
              className={classes.registerBtn}>Update</Button>
          </div>
        </CardActions>
      </Card>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    marginTop:60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    minWidth: 675
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