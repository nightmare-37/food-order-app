import React , { useState } from "react";

import CartNavigator from "./components/Layout/CartNavigator";
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './Context/cartProvider';

function App() {

  const [showCart,setShowCart]=useState(false);

  const showCartHandler=()=>{
    setShowCart(true);
  }

  const hideCartHandler=()=>{
    setShowCart(false);
  }

  return (
    <CartProvider>
      { <CartNavigator onShowcart={showCartHandler}/> }
      { showCart && <Cart onClose={hideCartHandler} />} 
    <main>
        <Meals />
      </main>
      </CartProvider>
  );
}

export default App;
