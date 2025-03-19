


const express = require("express");
const { addProduct, get, deleteProduct, getproductbyid } = require("../controller/productController");

const prouter = express.Router();


prouter.post("/add",addProduct)
prouter.get("/get",get)
prouter.delete("/delete/:id",deleteProduct)
prouter.get("/get/:id",getproductbyid)








module.exports = prouter;


