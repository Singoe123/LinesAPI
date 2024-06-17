import Like from "../models/likeModel.js";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";


//@desc Get all likes
//@route GET /api/likes
//@access Admin 
export const getLikes = async (req, res) => {
    try {
        const likes = await Like.findAll();
        return res.status(200).json(likes);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//@desc Get likes by post
//@route GET /api/likes/:postId
//@access Public
export const getLikesByPost = async (req, res) => {
    try {
        const likes = await Like.findByPost(req.params.postId);
        return res.status(200).json(likes);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//@desc Get likes by user
//@route GET /api/likes/:userId
//@access Public
export const getLikesByUser = async (req, res) => {
    try {
        const likes = await Like.findByUser(req.params.userId);
        return res.status(200).json(likes);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//@desc Like a post
//@route POST /api/likes/:postId
//@access Private
export const likePost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
    
        const like = await Like.exists(post._id, req.user);
        if (like) {
            return res.status(400).json({ message: "Post already liked" });
        }

        await Like.like(post._id, req.user);
        post.stats.likes += 1;
        await post.save();

        return res.status(201).json({ message: "Post liked" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


//@desc Unlike a post
//@route DELETE /api/likes/:postId
//@access Private

export const unlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const like = await Like.exists(post._id, req.user);
        if (!like) {
            return res.status(400).json({ message: "Post not liked" });
        }

        await Like.unlike(post._id, req.user);
        post.stats.likes -= 1;
        await post.save();

        return res.status(200).json({ message: "Post unliked" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

