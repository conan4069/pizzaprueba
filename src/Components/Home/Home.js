import React, { useState, useEffect } from 'react';
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
import IconButton from '@material-ui/core/IconButton';

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
  header: {
    flexGrow: 1,
    fontFamily: 'Pacifico , cursive',
    fontWeight: '700',
    color: '#319a2f',
    textAlign: 'center',
    paddingBottom: 15,
    fontSize: '35px'
  },
  title:{
    fontFamily:'Pacifico , cursive',
    fontWeight:'700',
    fontSize:'30px'
  },
  subtitle:{
    fontFamily:'Pacifico , cursive',
    fontWeight:'500',
    fontSize:'20px'
  }
}));

export default function Home(props) {
  const classes = useStyles();
  // States
  const [pizzas, setPizzas] = useState([]);
  const [openCar, setOpenCar] = useState(false);
  const [Car, setValueCar] = useState([]);
  const [CarTotal, setTotalCar] = useState({});
  // Effects
  useEffect(() => { // Get Pizzas
    axiosInstance.get('pizza')
      .then(response => {
        setPizzas(response.data.success.data)
      })
  }, [])
  useEffect(()=> {
    if (localStorage.getItem('token') != undefined || localStorage.getItem('token') != null) {
      axiosInstance.get('cart')
      .then(response => {
        setValueCar(response.data[0].items)
        setTotalCar(response.data[0].totals)
        console.log('Esto es el carrito ', response);
      })
    }
  }, [])
  useEffect(() => {
    console.log('La currency ->', props.currency);
    
    axiosInstance.defaults.headers['currency'] = props.currency
    console.log('La xxxxx ->', axiosInstance.defaults.headers);
  }, [props.currency])

  const handleClickOpen = () => {
    setOpenCar(true);
  };

  const handleClose = () => {
    setOpenCar(false);
  };

  const upToPizza = () => {

  }

  const ddPizza = () => {}
  
  const removePizza = () => { }

  function addPizza (object) {
    let id = object.id
    axiosInstance.get('order/'+id)
      .then(response => {
        if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null) {
          var tokenUser = response.data[0].token
          localStorage.setItem('token', tokenUser)
          axiosInstance.defaults.headers['Authorization'] = `Bearer ${tokenUser}`
          // console.log('El Token es', tokenUser);
          props.haveToken()
        }
        // console.log('Hello', response);
        // console.log('klasdkasd', localStorage.getItem('token'));
        setValueCar(response.data[0].items)
        setTotalCar(response.data[0].totals)
      })
  }

  const ourMenu =
    <section className="ourMenu">
      <div className="itemsTitle">
        <h3 style={{color:'#319a2f;'}} className="pacifico">Our Menu</h3>
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
                <h5>
                  <span className={`${props.currency == 'USD'?
                      'fa fa-dollar-sign':
                      'fa fa-euro-sign'}`
                  }></span> 
                  {props.currency === 'USD' ? pizza.price : pizza.eur_price}
                </h5>
                {/* <button onClick={() => addPizza(pizza)}>Add to Car</button> */}
                {/* <button onClick={() => handleClickOpen()}>Add to Car</button> */}
                {/*
                <span className="quantity"> 
                  <input type="number"/>
                  <button>+</button>
                  <button>-</button>
                </span>
                */}
                <button 
                  className="add" 
                  onClick={() => {
                    addPizza(pizza)
                    handleClickOpen()
                  }}>
                  <Icon className="fas fa-shopping-cart" />
                  Add to Car
                </button>
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
            variant="h4"
            // noWrap
            className={classes.header}
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
                  <div className="price">Price</div>
                  <div className="price">Aprox.</div>
                </div>
                <div className="qtyArea">Opt.</div>

              </div>
              <List>
                {/* {pizzas.map((pizza, index) => ( */}
                {Car.map((pizza, index) => (
                  <ListItem
                    key={index}>
                    <div className="qtyArea">
                      <TextField
                        disabled id={index+'.'+pizza.name}
                        value={pizza.quantity}
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
                      <div className="price">
                        <span>{pizza.price}</span>
                      </div>
                    </div>
                    <removeiv className="btnArea">
                      <IconButton 
                        onClick={() => ddPizza()}
                        size="small"
                      >
                        {<Icon style={{ color: 'red' }} className="fa fa-minus" />}
                      </IconButton>
                      <IconButton 
                        onClick={() => upToPizza()}
                        size="small"
                      >
                        {<Icon style={{ color: '#319a2f' }} className="fa fa-plus" />}
                      </IconButton>
                      {/* <IconButton onClick={() => removePizza()}>
                        {<Icon style={{ color: '#319a2f' }} className="fa fa-plus" />}
                      </IconButton> */}
                    </removeiv>
                  </ListItem>
                ))}
              </List>
              <div className="headerArea">
                <div className="qtyArea"></div>
                <div className="infoArea">
                  <div className="name">
                    Sub Total
                  </div>
                  <div className="price"></div>
                  <div className="price">{CarTotal.Subtotal}</div>
                </div>
                <div className="qtyArea"></div>
              </div>
              <div className="headerArea">
                <div className="qtyArea"></div>
                <div className="infoArea">
                  <div className="name">
                    TAX
                  </div>
                  <div className="price"></div>
                  <div className="price">{CarTotal.Tax}</div>
                </div>
                <div className="qtyArea"></div>
              </div>
              <div className="headerArea">
                <div className="qtyArea"></div>
                <div className="infoArea">
                  <div className="name">
                    Total
                  </div>
                  <div className="price"></div>
                  <div className="price">{CarTotal.Total}</div>
                </div>
                <div className="qtyArea"></div>
              </div>
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
                <h1 className={classes.title}>Yummi Pizza</h1>
                <p className={classes.subtitle}>The best ever</p>
              </div>
              <div className="footerP">
                <h1 className={classes.title}>Address</h1>
                <h5>Calle 20 entre av 5 y 6 Centro empresarial San Gabriel, <br/>
                Mérida,Venezuela. <br />
                +(000) 123 4565 32 <br />
                nikeven@gmail.com</h5>
              </div>
            </div>
          </div>
          <div className="aboutUs">
            <h1 className={classes.title}> About Us</h1>
            <p>We love to prepare the best pizzas you will ever eat,
             you won't be able to avoid saying Yummy with us 
            </p>
          </div>
          <div className="aboutUs">
            <h1 className={classes.title}> Follow Us</h1>
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
      <div className="copyright">
        &copy; {new Date().getFullYear()} Yummi Pizza.  All rights reserved.
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

