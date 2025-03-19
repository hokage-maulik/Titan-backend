



// // const express = require("express");
// // const { addCart, get, deleteCart } = require("../controller/cartController");

// // const cartrouter = express.Router();


// // cartrouter.post("/add",addCart)
// // cartrouter.get("/get",get)
// // cartrouter.delete("/delete/:id",deleteCart)








// // module.exports = cartrouter;


const express = require("express");
const {
    addToCart,
    getCartItems,
    incrementQuantity,
    decrementQuantity,
    deleteFromCart,
    getCartTotalPrice,
} = require("../controller/cartController");

const cartRouter = express.Router();

cartRouter.post("/add", addToCart);
cartRouter.get("/get", getCartItems);
cartRouter.patch("/increment/:id", incrementQuantity);
cartRouter.patch("/decrement/:id", decrementQuantity);
cartRouter.delete("/delete/:id", deleteFromCart);
cartRouter.get('/total',getCartTotalPrice);

module.exports = cartRouter;


