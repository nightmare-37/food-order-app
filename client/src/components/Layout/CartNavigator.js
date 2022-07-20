import React from "react";


import CartButton from './CartButton';

import classes from './CartNavigator.module.css';

const CartNavigator=(props)=> {
      return (
         <>
           <header className={classes.header}>
           <h1>Delicious Meals</h1>
           <CartButton onClick={props.onShowcart} />
           </header>
         </>
      );
};

export default CartNavigator;