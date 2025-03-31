const Post = require('../models/postModel');
const User = require("../models/user");
const { post } = require('../routes/blog');

// exports.createPost = async (req,res) => {
//     try{
//         const {title,body} = req.body;

//         // console.log(title);

//         const createpost = new Post({
//             title,body
//         });

//         const createdpost = await createpost.save();

//         res.status(200).json({
//             success : true,
//             post : createdpost
//         })
//     }catch(error){
//         console.log(`eroor is ocuured is ${error}`);
//     }
// };

exports.getAllPosts = async (req,res) => {
    try{
        const posts = await Post.find().populate("likes").populate("comments").exec();
        res.json({
            posts
        });
    }catch(error){
        res.status(404).json({
            error : "fetching error"
        })
    }
}


exports.createPost = async (req, res) => {
    try {
        const { title, body } = req.body;
        const userId = req.user.id;  // Assuming `userId` is attached to the `req.user` after authentication (JWT)

        // Create a new Post linked to the user
        const createpost = new Post({
            title,
            body,
            user: userId,  // Attach the user who created the post
        });

        // Save the post
        const createdpost = await createpost.save();

        // Optionally, add the post to the user's posts array
        const user = await User.findById(userId);
        user.posts.push(createdpost._id);
        await user.save();

        res.status(200).json({
            success: true,
            post: createdpost,  // Return the populated post
        });
    } catch (error) {
        console.log(`Error occurred: ${error}`);
        res.status(500).json({ success: false, message: "Error creating post" });
    }
};
