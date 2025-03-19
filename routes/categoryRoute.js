


const express = require("express");
const { addCategory, getCategory, deleteCategory, getSingleCategory, updateCategory } = require("../controller/categoryController");

const crouter = express.Router();


crouter.post("/add",addCategory)
crouter.get("/get",getCategory)
crouter.get("/get/:id",getSingleCategory)
crouter.patch("/update/:id",updateCategory)
crouter.delete("/delete/:id",deleteCategory)






module.exports = crouter;
