import mongoose from "mongoose";

const statsSchema = mongoose.Schema({
    likes: {
        type: Number,
        default: 0,
    },
    comments: {
        type: Number,
        default: 0,
    },
    reposts: {
        type: Number,
        default: 0,
    },
}, { _id: false });

const postSchema = mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    publication_date: {
        type: Date,
        default: Date.now,
    },
    stats: {
        type: statsSchema,
        default: ({}),
    },
});

postSchema.statics.findById = async function (id) {
    const post = await this.findOne({ _id: id }).select("-__v").populate("author", "name username profilePic").sort({ publicationDate: -1 });
    return post;
}

postSchema.statics.findByAuthor = async function (author, skip, limit) {
    const posts = await this.find({ author }).skip(skip).limit(limit).select("-author -__v").sort({ publicationDate: -1 });
    return posts;
}

const Post = mongoose.model("Post", postSchema);

export default Post;
    
