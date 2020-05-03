import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RegisterModal from '../Register/RegisterModal'

import Home from '../Home/Home'
import Login from '../Login/Login'
import Dashboard from '../Dashboard/Dashboard'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function PersistentDrawerRight() {
  const classes = useStyles();
  const getToken = localStorage.getItem('token')
  const initialMenu = [
    { name: 'Home', route: '/', icon: 'fa fa-home' },
  ]
  const fullMenu = initialMenu.concat([
    // { name: 'Dashboard', route: '/dashboard', icon: 'fa fa-columns' },
  { name: 'Profile', route: '/profile', icon: 'fa fa-user-alt' }])
  const cur = localStorage.getItem('currency')

  const [open, setOpen] = React.useState(false);
  const [token, setToken] = React.useState(getToken !== null ? true : false);
  const [menuItemsLateral,setMenu] = React.useState(getToken !== null ? fullMenu : initialMenu);
  const [currency,setCurrency] = React.useState(cur !== null ? cur : 'USD')

  // onClick={handleModalOpen}
  const logout = <IconButton
      color="inherit"
      onClick={() => {
        localStorage.removeItem('token')
        setToken(false)
        setMenu(initialMenu)
      }}
      aria-label="open drawer"
    >
      <Icon style={{fontWeight:700}} className="fa fa-sign-out-alt"></Icon>
    </IconButton>

  const currencyBtn = <IconButton
        color="inherit"
        onClick={() => {
          let newCurrency = currency === 'USD' ? 'EUR' : 'USD'
          localStorage.setItem('currency',newCurrency)
          setCurrency(newCurrency)
        }}
        aria-label="open drawer"
      >
        <Icon style={{fontWeight:700}} className={`${currency == 'USD'?
            'fa fa-dollar-sign':
            'fa fa-euro-sign'}`
        }></Icon>
      </IconButton>

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const loginToken = () => {
    setToken(true)   
    setMenu(fullMenu) 
  }

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerOpen}
              className={clsx(open && classes.hide)}
            >
              <Icon className="fa fa-bars" />
            </IconButton>
            <Typography variant="h6" noWrap className={classes.title}>
              Yummy Pizza
            </Typography>
            {currencyBtn}
            {
              token ? logout : [
                <RegisterModal key="register"></RegisterModal>,
                <Login key="login" donelog={loginToken}></Login>
              ]
            }
          </Toolbar>
        </AppBar>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <div>
            <Switch>
              <Route exact path="/">
                <Home key="home" haveToken={loginToken} currency={currency} />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
            </Switch>
          </div>
        </main>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <span style={{
                color:'#319a2f'
              }} 
              className={classes.title}>
              YP
            </span>
            <IconButton onClick={handleDrawerClose}>
              {
                <Icon style={{color:'#319a2f'}} className="fa fa-chevron-left"/>
              }
            </IconButton>
          </div>
          <Divider />
          <List>
            {menuItemsLateral.map((item, index) => (
              <ListItem button component={Link} to={item.route} key={index}>
                <ListItemIcon>{<Icon className={item.icon} />}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
    </Router>
  );
}

function Profile() {
  return (
    <div>
      <h2>profile</h2>
    </div>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    backgroundColor:'#319a2f',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
  title: {
    flexGrow: 1,
    fontFamily:'Pacifico , cursive',
    fontWeight:'700',
    fontSize:'30px'
  },
  hide: {
    display: 'none',
  },
  drawer: {
    // width: -drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
}));
