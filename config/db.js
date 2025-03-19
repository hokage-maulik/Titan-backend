
// const mongoose=require("mongoose")

// mongoose.connect("mongodb://localhost:27017/Titan-Project")

// const db=mongoose.connection

// db.on("connected",()=>{
//     console.log("connected to database")
// })


require('dotenv').config(); // Load environment variables

const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI; // Fallback to localhost for local development

mongoose.connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Error connecting to MongoDB", err));

const db = mongoose.connection;

db.on("connected", () => {
  console.log("connected to database");
});