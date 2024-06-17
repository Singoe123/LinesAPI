import mongoose from "mongoose";

const likeSchema = mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    like_date: {
        type: Date,
        default: Date.now,
    },
});

likeSchema.statics.findByPost = async function (post) {
    return await this.find({ post }).select("-post -__v").populate("user", "username name profilepic");
}

likeSchema.statics.findByUser = async function (user) {
    return await this.find({ user }).select("-user -__v");
}

likeSchema.statics.findAll = async function () {
    return await this.find().select("-__v").populate("user", "username name profilepic");
}

likeSchema.statics.exists = async function (post, user) {
    return await this.findOne({ post, user });
}

likeSchema.statics.like = async function (post, user) {
    return await this.create({ post, user });
}

likeSchema.statics.unlike = async function (post, user) {
    return await this.deleteOne({ post, user });
}

const Like = mongoose.model("Like", likeSchema);

export default Like;
