import express from 'express';
import { getPosts, getPostsByUsername, createPost, updatePost, deletePost } from '../controllers/postController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getPosts)
    .post(protect, createPost);

router.route('/:username')
    .get(getPostsByUsername);

router.route('/:id')
    .patch(protect, updatePost)
    .delete(protect, deletePost);

export default router;
