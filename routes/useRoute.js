

const express = require("express");
const { signup, login } = require("../controller/useController");

const router = express.Router();

router.post("/signUp",signup);  
router.post("/login",login);   


module.exports = router;