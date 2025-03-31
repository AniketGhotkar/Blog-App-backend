const express = require('express');
const router = express.Router();


// import controller 
const {dummyLink,giveLike,unlikePost} = require("../controllers/LikeController");
const {createComment} = require("../controllers/CommentController");
const {createPost,getAllPosts} = require("../controllers/postController");
const {signup,login} = require("../controllers/auth");
const {auth} = require("../middlewares/auth");


router.post("/login",login);
router.post("/signup",signup);

// Mapping create
router.get("/dummyroute",dummyLink);
router.post("/comments/create",auth, createComment);
router.post("/post/create",auth, createPost);
router.get("/posts",auth, getAllPosts);   
router.post("/likes/like",auth, giveLike);
router.post("/likes/unlike",auth, unlikePost);

// export
module.exports = router;
