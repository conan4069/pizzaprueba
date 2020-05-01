import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import Divider from '@material-ui/core/Divider';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';


function Register() {
  const classes = useStyles();
  return (
    <div className={classes.general}>
      <Card className={classes.root} variant="outlined">
        <CardHeader
          title="Sign Up"
        // subheader="September 14, 2016"
        />
        <Divider />
        <CardContent>
          <form className={classes.form} noValidate autoComplete="off">
            <TextField
              id="standard-name"
              label="Name"
              type="text"
            />
            <TextField
              id="standard-email"
              label="Email"
              type="email"
            />
            <TextField
              id="standard-pass"
              label="Password"
              type="password"
            />
            <TextField
              id="standard-phone"
              label="Phone"
              type="number"
            />
            <TextField
              id="standard-address"
              label="Address"
              type="text"
            />
          </form>
        </CardContent>
        <Divider />
        <CardActions>
          <Button size="small">Register</Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Register;

const useStyles = makeStyles({
  general: {
    display: 'flex',
    // flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    minWidth: 375,
    // maxWidth: 475,
    // minHeight: 400
  },
  form: {
    display: 'grid'
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
});