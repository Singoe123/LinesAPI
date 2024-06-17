import Post from "../models/postModel.js";
import User from "../models/userModel.js";

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
// @req     content
export const createPost = async (req, res) => {
    try {
        const new_post = req.body;
        new_post.author = req.user;
        const post = new Post(new_post);
        await post.save();
        return res.status(201).json(post);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
// @req     page, limit

export const getPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const posts = await Post.find().skip(skip).limit(limit).populate("author", "name username profilePic");
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// @desc    Get a post by author username
// @route   GET /api/posts/:username
// @access  Public
// @req     page, limit

export const getPostsByUsername = async (req, res) => {
    try {
        const username = req.params.username;
        const author = await User.findByUsername(username);
        if (!author) {
            return res.status(404).json({ message: "User not found" });
        }
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const posts = await Post.findByAuthor(author._id);
        return res.status(200).json({ author: author.getInfo(),  posts });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


// @desc   Update a post content 
// @route  PATCH /api/posts/:id
// @access Private
// @req    content

export const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (post.author.toString() !== req.user) {
            return res.status(403).json({ message: "You can only update your own posts" });
        }
        const { content } = req.body;
        post.content = content;
        post.save();
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// @desc   Delete a post
// @route  DELETE /api/posts/:id
// @access Private
// @req    id

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (post.author.toString() !== req.user) {
            return res.status(403).json({ message: "You can only delete your own posts" });
        }
        await Post.deleteOne({ _id: req.params.id });
        return res.status(200).json( { message: "Post deleted" , Date: new Date() });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
