import React, { useContext, useState } from 'react';
import axios from "axios";

import Modal from '../UI/Modal';
import CartElement from './CartElement';
import CartContext from '../../Context/cart-context';
import CheckoutForm from './CheckoutForm';

import classes from "./Cart.module.css";

const Cart=(props)=>{
    const cartCtx = useContext(CartContext);

    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const totalAmount = `Rs. ${cartCtx.totalAmount}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
      };
    
      const cartItemAddHandler = (item) => {
        cartCtx.addItem(item);
      };
    
      const orderHandler = () => {
        setIsCheckout(true);
      };

      const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        axios
          .post("http://localhost:5000/api/orders", { user: userData, items: cartCtx.items})
          .then(() => console.log("ordered sucessfully"))
          .catch((err) => console.log("Error in order axios post request"));
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
      };
    

      const cartContent=(
        <>
          <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartElement
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
           </ul>
           <div className={classes.total}>
             <span>Total Amount</span>
             <span>{totalAmount}</span>
           </div>
           {isCheckout && (
            <CheckoutForm onConfirm={submitOrderHandler} onCancel={props.onClose} />
            )}
           {!isCheckout && 
           <div className={classes.actions}>
              <button className={classes['button--alt']} onClick={props.onClose}>
                Close
               </button>
             {hasItems && (
               <button className={classes.button} onClick={orderHandler}>
                 Order
                </button>
             )}
           </div>
           }
        </>
      );

      const isSubmittingCartContent = <p>Sending order data...</p>;

      const didSubmitCartContent = (
        <>
          <p>Successfully sent the order!</p>
          <div className={classes.actions}>
          <button className={classes.button} onClick={props.onClose}>
            Close
          </button>
        </div>
        </>
      );

      return (
        <Modal onClose={props.onClose}>
          {!isSubmitting && !didSubmit && cartContent}
          {isSubmitting && isSubmittingCartContent}
          {!isSubmitting && didSubmit && didSubmitCartContent}
        </Modal>
      );
}

export default Cart;