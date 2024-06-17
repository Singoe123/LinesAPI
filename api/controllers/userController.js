import User from "../models/userModel.js";
import { registerUser, performUserUpdate } from "../services/userService.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// @desc Get all users
// @route GET /api/users
// @access Public
export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc Get user by username
// @route GET /api/users/:username
// @access Public
// @param username
export const getUserByUsername = async (req, res) => {
    try {
        const user = await User.findByUsername(req.params.username);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc Create a new user
// @route POST /api/users
// @access Public
// @body username, email, password, role, avatar, bio, social
export const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username, email and password are required' });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already registered' });
        }
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        const newUser = new User(req.body);
        registerUser(newUser);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc Login a user
// @route POST /api/users/login
// @access Public
// @body username, email, password
export const loginUser = async (req, res) => {
    try {
        console.log('Login request received')
        const { username, email, password } = req.body;
        
        if(!username && !email) {
            return res.status(400).json({ message: 'Username or email is required' });
        }
        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }

        let user;
        if (email) {
            user = await User.findOne({ email });
        } else {
            user = await User.findOne({ username });
        }

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        console.log('User logged in: ', user.username)
        console.log('Token: ', token)

        res.status(200).json({ user, token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc Update a user
// @route PATCH /api/users/:username
// @access Public
// @param username
export const updateUser = async (req, res) => {
    try {
        console.log(req.user)
        const user = await User.findOne({ _id: req.user });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        performUserUpdate(user, req.body);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// @desc Delete a user
// @route DELETE /api/users/:username
// @access Public
// @param username
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (user) {
            await User.deleteOne({ _id: user._id });
            res.status(200).json({ message: "User removed" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


