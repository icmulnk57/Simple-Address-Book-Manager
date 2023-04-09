const { json } = require("express");
const express=require("express");
const app=express();

app.use(json());
const contact=require("./routes/contactRouter")
app.use("/api/v1",contact)

if(process.env.Node_ENV="production"){
    app.use(express.static("address-book-manager/build"))
}




module.exports=app;