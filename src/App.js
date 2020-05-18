import React, { useState } from 'react';
import {Route} from 'react-router-dom';
import './App.css';

import Form from './components/Form'
import OrderPage from './components/OrderPage'
import NavAppBar from './components/NavAppBar'
import HomePage from './components/HomePage'

function App() {

  const [pizzaOrder, setPizzaOrder] = useState([])

  const addOrder = pizza => {
    const newOrder = {
      name: pizza.name,
      email: pizza.email,
      size: pizza.size,
      sauce: pizza.sauce,
    };
    setPizzaOrder([...pizzaOrder, newOrder])
  }

  return (
    <div>
      <NavAppBar />
      <Route exact path="/">
      <HomePage />
      </Route>
      <Route path="/pizza">
      <Form addOrder={addOrder} />
      </Route>
      <Route path="/order">
      <OrderPage pizzaOrder={pizzaOrder} />
      </Route>
    </div>
  );
}

export default App;
