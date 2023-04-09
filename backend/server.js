const app=require("./app");
const express=require('express');
const dotenv=require("dotenv");
const connectDatabase=require('./config/database')
const cors=require('cors')

app.use(express.json());

app.use(cors())



dotenv.config({path:"backend/config/config.env"});

//databse connection function call
connectDatabase();



app.listen(process.env.PORT,()=>{
    console.log(`server is running ${process.env.PORT}`);
})