const mongoose = require('mongoose');

require("dotenv").config();

const dbconnect = () => {
    try{
        mongoose.connect(process.env.mongo_uri).then(
            console.log("db is connected successfully")
        )
    }catch(error){
        console.log("DB facing connection issue");
        console.log(error);
        process.exist(1);
    }
};

module.exports = dbconnect;