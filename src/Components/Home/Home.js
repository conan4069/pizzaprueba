import React from 'react';
import logo from '../../logo.svg';
// import imagen from '../../assets/images/pizza.png';
import '../../App.css';
import './home.css';



function Home() {
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

      <section>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam libero excepturi, quidem perferendis doloribus repudiandae id sed rerum nostrum ut. Fugiat ratione velit, iusto nesciunt recusandae, corporis voluptas impedit beatae.
      </section>

    </div>
  );
};

export default Home;
