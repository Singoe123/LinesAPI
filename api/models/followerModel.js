import mongoose from "mongoose";

const followerSchema = mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    following: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    follow_date: {
        type: Date,
        default: Date.now,
    },
});

followerSchema.statics.findByFollowing = async function (following) {
    return await this.find({ following }).select("-follower -__v").populate("following", "username name profilepic");
}

followerSchema.statics.findByFollower = async function (follower) {
    return await this.find({ follower }).select("-following -__v").populate("follower", "username name profilepic");
}

followerSchema.statics.findAll = async function () {
    return await this.find().select("-__v").populate("follower", "username name profilepic").populate("following", "username name profilepic");
}

followerSchema.statics.exists = async function (following, follower) {
    return await this.findOne({ following, follower });
}

followerSchema.statics.follow = async function (following, follower) {
    return await this.create({ following, follower });
}

followerSchema.statics.unfollow = async function (following, follower) {
    return await this.deleteOne({ following, follower });
}

const Follower = mongoose.model("Follower", followerSchema);

export default Follower;
