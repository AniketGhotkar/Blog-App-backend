const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());


app.use(express.json());

require("dotenv").config();
const Port = process.env.port || 4000;

const blog = require("./routes/blog");
app.use("/",blog);

app.get('/',(req,res) => {
    res.send(`<h1>This is Homepage Baby`);
})

const dbconnect = require('./config/database');
dbconnect();


app.listen(Port,() => {
    console.log(`app is Running on ${Port}`);
})