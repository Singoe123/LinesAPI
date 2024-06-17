import express from 'express';
import { getFollowers, getFollows, getFollowing, follow, unfollow } from '../controllers/followerController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getFollows);

router.route('/following/:followingId')
    .get(getFollowing)
    .post(protect, follow)
    .delete(protect, unfollow);

router.route('/follower/:followedId')
    .get(getFollowers);

export default router;
