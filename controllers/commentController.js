const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

exports.createComment = async (req, res) => {
    try {
        const { post, user, body } = req.body;

        // Create a new comment instance
        const comment = new Comment({
            post,
            user,
            body
        });

        // Save the comment
        const savedComment = await comment.save();

        // Update the post with the new comment ID
        const updatedPost = await Post.findByIdAndUpdate(
            post,
            { $push: { comments: savedComment._id } },
            { new: true }
        ).populate("comments").exec();


        console.log(updatedPost);
        res.json({
            post: updatedPost
        });
    } catch (error) {
        console.log(`Error occurred: ${error}`);
    }
};
