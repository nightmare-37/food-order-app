const express=require("express");

const mealsControllers = require('../controllers/meals-controllers');

const router=express.Router();

router.get("/",mealsControllers.getMeals);

module.exports = router;