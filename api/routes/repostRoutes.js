import express from 'express';
import { getReposts, getRepostsByPost, repost, unrepost, getRepostsByUser } from '../controllers/repostController.js';
import { protect } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.route('/')
    .get(getReposts);

router.route('/post/:postId')
    .post(protect, repost)
    .delete(protect, unrepost)
    .get(getRepostsByPost);

router.route('/user/:userId')
    .get(getRepostsByUser);

export default router;
