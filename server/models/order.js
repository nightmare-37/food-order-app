const mongoose=require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {
        name: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true,
        }
    },
    orderedItems:  [
        {
            id: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            amount: {
                type: Number,
                required: true
            },
            price: {
                type: String,
                required: true
            }

        }
     ]          
 
});

module.exports= mongoose.model("order",orderSchema);