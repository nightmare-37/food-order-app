const express=require("express");

const Meals=require("../models/meal");
const HttpError=require("../models/http-error");

const getMeals = async(req,res,next)=>{
    let meals;
    try{
        meals = await Meals.find();
    }
    catch (err) {
        const error = new HttpError(
          err.message,
          500
        );
        return next(error);
    }

    res.json({ meals: meals.map(meal=> meal.toObject({ getters: true }))});
    
}

exports.getMeals=getMeals;