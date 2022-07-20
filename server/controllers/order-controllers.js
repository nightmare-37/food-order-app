const express=require("express");

const Orders=require("../models/order");

const HttpError=require("../models/http-error");

const orderDetail= async (req,res,next)=>{

    const { user, items} = req.body;
    const { name , street , city , pincode}=user;

    let orders=new Orders({
        user: {
         name,
         street,
         city,
         pincode
        },
        orderedItems: items
 
     });

     try {
        await orders.save();
      } catch (err) {
        const error = new HttpError(
          err.message,
          500
        );
        return next(error);
      }

      res.status(201).json({ orders : orders.toObject({ getters: true }) });
}

exports.orderDetail = orderDetail;