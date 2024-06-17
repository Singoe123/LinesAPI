import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import Repost from "../models/repostModel.js";

//@desc Get all repoists 
//@route GET /api/reposts
//@access Admin 
export const getReposts = async (req, res) => {
    try {
        const reposts = await Repost.findAll();
        return res.status(200).json(reposts);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//@desc Get reposts by post
//@route GET /api/reposts/:postId
//@access Public
export const getRepostsByPost = async (req, res) => {
    try {
        const reposts = await Repost.findByPost(req.params.postId);
        return res.status(200).json(reposts);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//@desc Get reposts by user
//@route GET /api/reposts/:userId
//@access Public
export const getRepostsByUser = async (req, res) => {
    try {
        const reposts = await Repost.findByUser(req.params.userId);
        return res.status(200).json(reposts);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//@desc Repost a post
//@route POST /api/reposts/:postId
//@access Private
export const repost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
    
        const repost = await Repost.exists(post._id, req.user);
        if (repost) {
            return res.status(400).json({ message: "Post already reposted" });
        }

        await Repost.repost(post._id, req.user);
        post.stats.reposts += 1;
        await post.save();

        return res.status(201).json({ message: "Post reposted" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


//@desc Unrepost a post
//@route DELETE /api/reposts/:postId
//@access Private

export const unrepost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const repost = await Repost.exists(post._id, req.user);
        if (!repost) {
            return res.status(400).json({ message: "Post not reposted" });
        }

        await Repost.unrepost(post._id, req.user);
        post.stats.reposts -= 1;
        await post.save();

        return res.status(200).json({ message: "Post unreposted" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

