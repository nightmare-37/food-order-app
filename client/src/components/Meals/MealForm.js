import { useRef, useState } from 'react';

import classes from './MealForm.module.css';

const MealForm=(props)=> {

    const [amountInRange, setAmountInRange] = useState(true);

    const amountRef=useRef();

    const formSubmitHandler = (event) =>{

        event.preventDefault();

        const enteredAmountDigit = amountRef.current.value;
        const enteredAmount = +enteredAmountDigit;

        if (
            enteredAmountDigit.trim().length === 0 ||
            enteredAmount < 1 ||
            enteredAmount > 5
          ) {
            setAmountInRange(false);
            return;
          }
          props.onAddToCart(enteredAmount);
    };

    return (
        <form className={classes.form} onSubmit={formSubmitHandler}>
            <div className={classes.input}>
                <label htmlFor="amount">Amount</label>
                <input ref={amountRef} id="amount" type='number' min='1' max='5' step='1' defaultValue='1' />
            </div>
            <button>+ Add</button>
            {!amountInRange && <p>Please enter a valid amount (1-5).</p>}
        </form>
    );
}

export default MealForm;