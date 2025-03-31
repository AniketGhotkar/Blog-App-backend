const Like = require("../models/likeModel");
const Post = require("../models/postModel");

exports.giveLike = async (req,res) => {
    try{
        const { post, user} = req.body;

        const newLike = new Like({
            post,user
        });

        const response = await  newLike.save();

          const updatedPost = await Post.findByIdAndUpdate(
                   post,
                   { $push: { likes: response._id } },
                   { new: true }
               ).populate("likes").exec();

        res.status(200).json({
            updatedPost
        })
    }catch(error){
        return res.status(404).json({
            error : "error is occured in like"
        })
    }
}

exports.takeLike = async (req,res) => {
    try{
        const { post, user} = req.body;

        const newLike = new Like({
            post,user
        });

        const response = await  newLike.save();

          const updatedPost = await Post.findByIdAndUpdate(
                   post,
                   { $pull: { likes: response._id } },
                   { new: true }
               ).populate("likes").exec();

        res.status(200).json({
            updatedPost
        })
    }catch(error){
        return res.status(404).json({
            error : "error is occured in unlike"
        })
    }
}

exports.unlikePost = async (req, res) => {
    try {
        const { post, like } = req.body;

        // Find and delete the like
        const deleteLike = await Like.findOneAndDelete({
            post: post,
            _id: like
        });

        // Check if the like was deleted
        if (!deleteLike) {
            return res.status(404).json({
                error: "Like not found or already deleted"
            });
        }

        // Update the post to remove the like
        const updatedPost = await Post.findByIdAndUpdate(
            post, // Post ID
            { $pull: { likes: deleteLike._id } }, // Remove the like from the array
            { new: true } // Return the updated post
        ).populate("likes").exec();

        res.status(200).json({
            success: true,
            post: updatedPost
        });
    } catch (error) {
        console.error(`Error occurred in unlikePost: ${error}`);
        return res.status(500).json({
            error: "Error occurred in unlikePost"
        });
    }
};


exports.dummyLink = (req,res) => {
    res.send(`<H1> This is Dummy Page`);
}