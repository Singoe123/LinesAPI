import Follower from "../models/followerModel.js";
import User from "../models/userModel.js";


//@desc Get all follows
//@route GET /api/follows
//@access Admin 
export const getFollows = async (req, res) => {
    try {
        const follows = await Follower.findAll();
        return res.status(200).json(follows);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//@desc Get follows by following 
//@route GET /api/follows/following/:followingId
//@access Public
export const getFollowing = async (req, res) => {
    try {
        const follows = await Follower.findByFollowing(req.params.followingId);
        return res.status(200).json(follows);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//@desc Get followers by user
//@route GET /api/follows/followed/:followedId
//@access Public
export const getFollowers = async (req, res) => {
    try {
        const follows = await Follower.findByFollower(req.params.followedId);
        return res.status(200).json(follows);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//@desc Follow a user
//@route POST /api/follows/following/:followingId
//@access Private
export const follow = async (req, res) => {
    try{
        const followed = await User.findById(req.params.followingId);
        if (!followed) {
            return res.status(404).json({ message: "Followed not found" });
        }
    
        const follow = await Follower.exists(followed._id, req.user);
        if (follow) {
            return res.status(400).json({ message: "User already followed" });
        }

        await Follower.follow(followed._id, req.user);
        followed.follower_count += 1;
        await followed.save();

        return res.status(201).json({ message: "User followed" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


//@desc Unfollower a post
//@route DELETE /api/following/:followingId
//@access Private

export const unfollow = async (req, res) => {
    try {
        const followed = await User.findById(req.params.followingId);
        if (!followed) {
            return res.status(404).json({ message: "Followed not found" });
        }

        const follow = await Follower.exists(followed._id, req.user);
        if (!follow) {
            return res.status(400).json({ message: "User not followed" });
        }

        await Follower.unfollow(followed._id, req.user);
        followed.follower_count -= 1;
        await followed.save();

        return res.status(200).json({ message: "User unfollowed" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

