const mongoose = require("mongoose");


const userschema = new mongoose.Schema({
    name: {
        type:String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true
    },
    password : {
        type : String,
        required:true,
    },
    role : {
        type : String,
        enum : ["Admin","Student","Visitor"],
        default : "Visitor",
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
})

module.exports = mongoose.model("User",userschema);