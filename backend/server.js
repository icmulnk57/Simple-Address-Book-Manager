const app=require("./app");
const express=require('express');
const dotenv=require("dotenv");
const connectDatabase=require('./config/database')

app.use(express.json());

dotenv.config({path:"backend/config/config.env"});

//databse connection function call
connectDatabase();



app.listen(process.env.PORT,()=>{
    console.log(`server is running ${process.env.PORT}`);
})