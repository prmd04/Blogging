const express = require("express");
const connectDb = require("./config/db");
const router = require("./router");
const session = require("express-session");
const checkAuth = require("./middleware/checkAuth");
require('dotenv').config()

const app = express();
connectDb();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(session({
  secret:"dummy key",
  resave:true,
  saveUninitialized:true
}))
app.use(checkAuth)
app.use(router)


app.set("view engine",'ejs');
app.use(express.static("public"));



app.listen(3000,()=>console.log("port is listening 3000"));