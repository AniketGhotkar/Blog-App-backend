const mongoose = require('mongoose');

// route handler
const postSchema = mongoose.Schema({
    title:{
        type : String,
        required : true
    },
    body:{
        type: String,
        required : true
    },
    likes:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Like"
    },
    comments:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Comment"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
    }
});

// exports
module.exports = mongoose.model('Post',postSchema);