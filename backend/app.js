const { json } = require("express");
const express=require("express");
const app=express();

app.use(json());
const contact=require("./routes/contactRouter")
app.use("/api/v1",contact)






module.exports=app;