import React, { useState, useEffect } from 'react';
// import logo from '../../logo.svg';
// import imagen from '../../assets/images/pizza.png';
import '../../App.css';
import './home.css';
import { axiosInstance } from '../../axiosInstance.js'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Icon from '@material-ui/core/Icon';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
// import InboxIcon from '@material-ui/icons/Inbox';
// import DraftsIcon from '@material-ui/icons/Drafts'

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
  const offline = [
    {
      "id": 1,
      "name": "Margherita",
      "ingredients": "mozzarella, tomato & basil",
      "price": 16.5,
      "image": "https://img2.freepng.es/20180513/wkq/kisspng-california-style-pizza-sicilian-pizza-pizza-marghe-5af8211cd60025.2324954415262108448766.jpg",
      "created_at": "2020-05-02T07:42:09.000000Z",
      "updated_at": "2020-05-02T07:42:09.000000Z"
    },
    {
      "id": 2,
      "name": "Tropical",
      "ingredients": "mozzarella, tomato, ham & pineapple",
      "price": 17.5,
      "image": "https://img2.freepng.es/20180604/plo/kisspng-california-style-pizza-sicilian-pizza-hawaiian-piz-hawaiian-pizza-5b15bd83c479e7.9233370615281514278048.jpg",
      "created_at": "2020-05-02T07:42:09.000000Z",
      "updated_at": "2020-05-02T07:42:09.000000Z"
    },
    {
      "id": 3,
      "name": "Capricciosa",
      "ingredients": "mozzarella, tomato, ham, mushrooms, olives & anchovies",
      "price": 17.5,
      "image": "https://img2.freepng.es/20180408/wjw/kisspng-pizza-margherita-doner-kebab-ham-pesto-fungi-5aca84b612d353.5082666715232216860771.jpg",
      "created_at": "2020-05-02T07:42:09.000000Z", "updated_at": "2020-05-02T07:42:09.000000Z"
    },
    {
      "id": 4,
      "name": "Vegetarian",
      "ingredients": "mozzarella, tomato, mushrooms, onions, peppers, pineapple, olives & capers",
      "price": 17.5,
      "image": "https://img2.freepng.es/20180630/vc/kisspng-vegetarian-cuisine-domino-s-pizza-garlic-bread-ham-5b37a16d26a037.5282653815303724611582.jpg",
      "created_at": "2020-05-02T07:42:09.000000Z",
      "updated_at": "2020-05-02T07:42:09.000000Z"
    },
    {
      "id": 5,
      "name": "Patata",
      "ingredients": "mozzarella, onion, potato, rosemary, salt, garlic & parsley",
      "price": 17.5,
      "image": "https://img2.freepng.es/20180528/oit/kisspng-dish-network-recipe-cuisine-mixture-pizza-potato-5b0bb0c40b3415.2231539015274928040459.jpg",
      "created_at": "2020-05-02T07:42:09.000000Z",
      "updated_at": "2020-05-02T07:42:09.000000Z"
    },
    {
      "id": 6,
      "name": "Ausie",
      "ingredients": "mozzarella, tomato, bacon & egg",
      "price": 17.5,
      "image": "https://img2.freepng.es/20180323/ale/kisspng-pizza-bacon-hamburger-barbecue-sauce-bacon-5ab4b28d1fa678.2294045715217916291296.jpg",
      "created_at": "2020-05-02T07:42:09.000000Z",
      "updated_at": "2020-05-02T07:42:09.000000Z"
    },
    {
      "id": 7,
      "name": "Meat Lovers",
      "ingredients": "mozzarella, tomato, ham, bacon, sopressa salami & BBQ sauce",
      "price": 18,
      "image": "https://img2.freepng.es/20180404/ttw/kisspng-pizza-salami-ham-italian-cuisine-barbecue-pizza-5ac59dd3ce75b1.7707154215229004358457.jpg",
      "created_at": "2020-05-02T07:42:09.000000Z",
      "updated_at": "2020-05-02T07:42:09.000000Z"
    },
    {
      "id": 8,
      "name": "Calabrese",
      "ingredients": "mozzarella, tomato, sopressa salami & peppers",
      "price": 18,
      "image": "https://img2.freepng.es/20180511/vqw/kisspng-pizza-salami-italian-cuisine-ham-prosciutto-5af5f12cd29e28.9362917315260675008627.jpg",
      "created_at": "2020-05-02T07:42:09.000000Z",
      "updated_at": "2020-05-02T07:42:09.000000Z"
    }
  ]
  // useEffect(() => { 
  //   axiosInstance.get('pizza')
  //     .then(response => {
  //       // let text = JSON.stringify(response.data.success.data)
  //       // console.log('response ->', text);
  //       // console.log('response ->', response.data.success.data);
  //       // setPizzas(response.data.success.data)
        
  //       setPizzas(offline)
  //       console.log('El offline ->', offline);
  //     })
  // }, [])
  
  const handleClickOpen = () => {
    console.log('hello');
    setOpenCar(true);
  };

  const handleClose = () => {
    setOpenCar(false);
  };

  const ourMenu =
    <section className="ourMenu">
      <div className="itemsTitle">
        <h3>Our Menu</h3>
      </div>
      <div className="items">
        {offline.map((pizza, index) => (
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
                <button onClick={() => handleClickOpen()}>Add to Car</button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  
  const carDialog = 
      <div>
        {/* <Button 
          variant="outlined" 
          color="primary" 
          onClick={handleClickOpen}
        >
          Open alert dialog
        </Button> */}
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
              <List>
                {/* {pizzas.map((pizza, index) => ( */}
                {offline.map((pizza, index) => (
                  <ListItem 
                    // button 
                    // component={Link} 
                    key={index}>
                    {/* <ListItemIcon>{<Icon className={pizza.icon} />}</ListItemIcon> */}
                    <input type="text"></input>
                    <ListItemText primary={pizza.name} />
                    <button>-</button>
                    <button>+</button>
                  </ListItem>
                ))}
              </List>
            </div>
            {/* <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Back
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              Send
            </Button>
          </DialogActions>
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
                    <Icon className="fa fa-facebook-square" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Icon className="fa fa-twitter-square" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Icon className="fa fa-twitter-square" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Icon className="fa fa-snapchat-square" />
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
      <section>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam libero excepturi, quidem perferendis doloribus repudiandae id sed rerum nostrum ut. Fugiat ratione velit, iusto nesciunt recusandae, corporis voluptas impedit beatae.
      </section>
      {footer}

    </div>
  );
};

