


const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({

    quantity: {
        type: Number
          },
          price: { type: Number

           },
    productId: {
        type: mongoose.Schema.Types.ObjectId, ref:"product",
       }



})

const cartModel = new mongoose.model("cart", cartSchema)

module.exports = cartModel

