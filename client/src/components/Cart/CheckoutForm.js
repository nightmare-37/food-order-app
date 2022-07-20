import { useRef, useState } from 'react';

import classes from './CheckoutForm.module.css';

const isEmpty = (value) => value.trim() === '';
const isSixChars = (value) => value.trim().length === 6;


const CheckoutForm=(props)=>{

    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        pincode: true,
      });

      const nameInputRef = useRef();
     const streetInputRef = useRef();
     const pincodeInputRef = useRef();
     const cityInputRef = useRef();

     const confirmHandler = (event) => {
        event.preventDefault();
        
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPincode =pincodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPincodeIsValid = isSixChars(enteredPincode);

        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            pincode: enteredPincodeIsValid,
          });

          const formIsValid =
            enteredNameIsValid &&
            enteredStreetIsValid &&
            enteredCityIsValid &&
            enteredPincodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        city: enteredCity,
        pincode: enteredPincode,
      });

     };



    const nameControlClasses = `${classes.control} ${
        formInputsValidity.name ? '' : classes.invalid
      }`;
      const streetControlClasses = `${classes.control} ${
        formInputsValidity.street ? '' : classes.invalid
      }`;
      const pincodeControlClasses = `${classes.control} ${
        formInputsValidity.postalCode ? '' : classes.invalid
      }`;
      const cityControlClasses = `${classes.control} ${
        formInputsValidity.city ? '' : classes.invalid
      }`;

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
          <div className={nameControlClasses}>
            <label htmlFor='name'>Your Name</label>
            <input id='name'  type='text' ref={nameInputRef} />
            {!formInputsValidity.name && <p>Please enter a valid name!</p>}
          </div>
          <div className={streetControlClasses}>
            <label htmlFor='street'>Street</label>
            <input  id='street' type='text' ref={streetInputRef} />
            {!formInputsValidity.street && <p>Please enter a valid street!</p>}
          </div>
          <div className={pincodeControlClasses}>
            <label htmlFor='pincode'>Pincode</label>
            <input  id='pincode' type='text' ref={pincodeInputRef} />
            {!formInputsValidity.pincode && (
              <p>Please enter a valid pincode (6 characters long)!</p>
            )}
          </div>
          <div className={cityControlClasses}>
            <label htmlFor='city'>City</label>
            <input type='text' id='city' ref={cityInputRef} />
            {!formInputsValidity.city && <p>Please enter a valid city!</p>}
          </div>
          <div className={classes.actions}>
            <button type='button' onClick={props.onCancel}>
              Cancel
            </button>
            <button className={classes.submit}>Confirm</button>
          </div>
        </form>
      );
    };

export default CheckoutForm;