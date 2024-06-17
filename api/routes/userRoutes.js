import express from 'express';
import { getUsers, loginUser, getUserByUsername, createUser, updateUser, deleteUser } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getUsers)
    .post(createUser)
    .patch(protect, updateUser)
    .delete(protect, deleteUser);

router.route('/login')
    .post(loginUser);

router.route('/:username')
    .get(getUserByUsername)

export default router;
