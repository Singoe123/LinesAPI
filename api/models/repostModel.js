import mongoose from "mongoose";

const repostSchema = mongoose.Schema({
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
    repost_date: {
        type: Date,
        default: Date.now,
    },
});

repostSchema.statics.findByPost = async function (post) {
    return await this.find({ post }).select("-post -__v").populate("user", "username name profilepic");
}

repostSchema.statics.findByUser = async function (user) {
    return await this.find({ user }).select("-user -__v");
}

repostSchema.statics.findAll = async function () {
    return await this.find().select("-__v").populate("user", "username name profilepic");
}

repostSchema.statics.exists = async function (post, user) {
    return await this.findOne({ post, user });
}

repostSchema.statics.repost = async function (post, user) {
    return await this.create({ post, user });
}

repostSchema.statics.unrepost = async function (post, user) {
    return await this.deleteOne({ post, user });
}

const Repost = mongoose.model("Repost", repostSchema);

export default Repost;
