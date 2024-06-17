import express from 'express';
import { getLikes, getLikesByPost, likePost, unlikePost, getLikesByUser } from '../controllers/likeController.js';
import { protect } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.route('/')
    .get(getLikes);

router.route('/post/:postId')
    .post(protect, likePost)
    .delete(protect, unlikePost)
    .get(getLikesByPost);

router.route('/user/:userId')
    .get(getLikesByUser);

export default router;
