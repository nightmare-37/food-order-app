import { useContext } from 'react';

import MealForm from "./MealForm";
import CartContext from '../../Context/cart-context';

import classes from './MealElement.module.css';

const MealElement=(props)=> {

    const cartCtx = useContext(CartContext);

    const price = `Rs. ${props.price}`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    });
  };
   
   
    return (
        <li className={classes.meal}>
          <div>
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{price}</div>
          </div>
          <div>
            <MealForm onAddToCart={addToCartHandler} />
          </div>
        </li>
      );
}

export default MealElement;