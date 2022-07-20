import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealElement from './MealElement';
import classes from './AvailableMeals.module.css';


const AvailableMeals=()=>{

    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(()=>{
        const fetchMeals = async () => {
            const response = await fetch(
              'http://localhost:5000/api/meals'
            );
      
            if (!response.ok) {
              throw new Error('Something went wrong!');
            }
      
            const responseData = await response.json();
      
            setMeals(responseData.meals);
            setIsLoading(false);
          };

          fetchMeals().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
          });
    },[]);

    if (isLoading) {
        return (
          <section className={classes.MealsLoading}>
            <p>Loading...</p>
          </section>
        );
      }

      if (httpError) {
        return (
          <section className={classes.MealsError}>
            <p>{httpError}</p>
          </section>
        );
      }
  
    return (
        <section className={classes.meals}>
          <Card>
            <ul>{ meals.map((meal) => (
               <MealElement
                    key={meal.id}
                    id={meal.id}
                    name={meal.name}
                    description={meal.description}
                    price={meal.price}
                />
                 ))
                }
            </ul>
          </Card>
        </section>
      );
    };
    
    export default AvailableMeals;
