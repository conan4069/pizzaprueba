import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';

import Divider from '@material-ui/core/Divider';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';


function Login() {
  const classes = useStyles();
  return (
    <div className={classes.general}>
      <Card className={classes.root} variant="outlined">
        <CardHeader
          title="Sign In"
        // subheader="September 14, 2016"
        />
        <Divider />
        <CardContent>
          <form className={classes.form} noValidate autoComplete="off">
            <TextField
              // error
              id="standard-basic"
              label="Email"
              type="email"
            />
            <TextField
              id="standard-basic"
              label="Password"
              type="password"
            />
          </form>
        </CardContent>
        <Divider />
        <CardActions>
          <Button size="small">LogIn</Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Login;

const useStyles = makeStyles({
  general: {
    display: 'flex',
    // flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    minWidth: 375,
    maxWidth: 475,
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