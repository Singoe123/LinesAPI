import mongoose from 'mongoose';

const profilePicSchema = mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    width: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
}, { _id: false });

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    follower_count: {
        type: Number,
        default: 0,
    },
    profile_pic: {
        type: profilePicSchema,
    },
    bio: {
        type: String,
    },
},{
    timestamps: true,
});

userSchema.statics.findAll = async function () {
    return await this.model('User').find().select('-__v');
}

userSchema.statics.findByUsername = async function (username) {
    return await this.model('User').findOne({ username }).select('-__v -password');
}

userSchema.methods.getInfo = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.email;
    delete userObject.bio;
    delete userObject.follower_count;
    delete userObject.__v;
    return userObject;
}

const User = mongoose.model('User', userSchema);

export default User;



