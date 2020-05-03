import React, { useState, useEffect } from 'react';
// import logo from '../../logo.svg';
// import imagen from '../../assets/images/pizza.png';
import '../../App.css';
import './home.css';
import { axiosInstance } from '../../axiosInstance.js'

// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Icon from '@material-ui/core/Icon';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import Divider from '@material-ui/core/Divider';

import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Home() {
  const classes = useStyles();
  // States
  const [pizzas, setPizzas] = useState([]);
  const [openCar, setOpenCar] = useState(false);
  // Effects
  useEffect(() => { 
    axiosInstance.get('pizza')
      .then(response => {
        let text = JSON.stringify(response.data.success.data)
        setPizzas(response.data.success.data)
      })

    // axiosInstance.get('order')
    //   .then(response => {
    //     console.log('response ->', response);
    //     // setPizzas(response.data.success.data)
    //   })

  }, [])
  
  const handleClickOpen = () => {
    setOpenCar(true);
  };

  const handleClose = () => {
    setOpenCar(false);
  };

  function addPizza (object) {
    let id = object.id
    axiosInstance.get('order/'+id)
      .then(response => {
        if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null) {
          var tokenUser = response.data[0].token
          localStorage.setItem('token', tokenUser)
          axiosInstance.defaults.headers['Authorization'] = `Bearer ${tokenUser}`
          console.log('Hello', response);
          console.log('El Token es', tokenUser);
        }
        console.log('klasdkasd', localStorage.getItem('token'));
        
      })
    
  } 

  const ourMenu =
    <section className="ourMenu">
      <div className="itemsTitle">
        <h3>Our Menu</h3>
      </div>
      <div className="items">
        {pizzas.map((pizza, index) => (
          <div key={'pizza.'+index}>
            <img
              src={pizza.image}
              alt="Avatar"
              className="itemImage"
            />
            <div className="overlay">
              <div className="text">
                <h2>{pizza.name}</h2>
                <h5>{pizza.ingredients}</h5>
                <h5>{pizza.price} $</h5>
                {/* <button onClick={() => addPizza(pizza)}>Add to Car</button> */}
                {/* <button onClick={() => handleClickOpen()}>Add to Car</button> */}
                {/*
                <span className="quantity"> 
                  <input type="number"/>
                  <button>+</button>
                  <button>-</button>
                </span>
                */}
                <button className="add" onClick={() => handleClickOpen()}>Add to Car</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  
  const carDialog = 
      <div>
        <Dialog
          open={openCar}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle 
            id="alert-dialog-title"
          >
            {"Your Order !"}
          </DialogTitle>
          <DialogContent>
            <div>
              <div className="headerArea">
                <div className="qtyArea">Qty.</div>
                <div className="infoArea">
                  <div className="name">
                    Pizza
                  </div>
                  <div className="price">Total</div>
                </div>
              </div>
              <List>
                {/* {pizzas.map((pizza, index) => ( */}
                {pizzas.map((pizza, index) => (
                  <ListItem 
                    key={index}>
                    <div className="qtyArea">
                      <TextField 
                        disabled id={index+'.'+pizza.name} 
                        defaultValue="0" 
                        // label="Quantity" 
                      />
                    </div>
                    <div className="infoArea">
                      <div className="name">
                        <ListItemText 
                          primary={pizza.name} 
                        />
                      </div>
                      <div className="price">
                        <span>{pizza.price}</span>
                      </div>
                    </div>
                  </ListItem>
                ))}
              </List>
            </div>
          </DialogContent>
        </Dialog>
      </div>

  const footer = 
    <section className="sectionFooter">
      <div className="internalContainer">
        <div className="row">
          <div className="textAddress">
            <div className="row">
              <div className="footerTitle">
                <h1>Yummi Pizza</h1>
                <p>The best ever</p>
              </div>
              <div className="footerP">
                <h5>Melbourne,south Brisbane, <br/>
                QLD 4101,Aurstralia. <br />
                +(000) 123 4565 32 <br />
                mail@example.com</h5>
              </div>
            </div>
          </div>
          <div className="aboutUs">
            <h1> About Us</h1>
            <p>Lorem ipsum dolor sit amet, <br/>
            consectetur adipiscing elit</p>
          </div>
          <div className="aboutUs">
            <h1> Fallow Us</h1>
            <div className="icons">
              <ul>
                <li>
                  <a href="#">
                    <Icon className="fab fa-facebook" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Icon className="fab fa-twitter-square" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Icon className="fab fa-instagram-square" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Icon className="fab fa-linkedin" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

  return (
    <div className="home">
      {/*
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    */}
      <section className="slider">
        <div className="content">
          <span className="text">
            <h2>The best </h2>
            <h1> Pizza </h1>
          </span>
        </div>

        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </section>
      {carDialog}
      {ourMenu}
      <section className="slider-pizzas"></section>
      {footer}

    </div>
  );
};

