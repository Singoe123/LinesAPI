import bcrypt from 'bcrypt';
import User from '../models/userModel.js';

export const registerUser = async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword; 
    await user.save();
};

export const performUserUpdate = async (user, newData) => {
    console.log(user, typeof user)
    user.username = newData.username || user.username;
    user.email = newData.email || user.email;
    user.password = newData.password || user.password;
    user.profile_pic = newData.profile_pic || user.profile_pic;
    user.bio = newData.bio || user.bio;
    await user.save();
}

