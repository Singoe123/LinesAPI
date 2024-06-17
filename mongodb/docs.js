// Insert auth and create new user

use("admin")

db.auth("123", "123")

use("lines")

// Insert test documents in the "users" collection
db.users.insertMany([
  {
    username: "user1",
    name: "User One",
    email: "user1@example.com",
    password: "password1",
    follower_count: 10,
    profilePic: {
      url: "https://example.com/user1.jpg",
      size: 1024,
      width: 200,
      height: 200
    },
    bio: "I am User One"
  },
  {
    username: "user2",
    name: "User Two",
    email: "user2@example.com",
    password: "password2",
    follower_count: 20,
    profilePic: {
      url: "https://example.com/user2.jpg",
      size: 2048,
      width: 300,
      height: 300
    },
    bio: "I am User Two"
  },
]);

// Insert test documents in the "posts" collection
db.posts.insertMany([
  {
    content: "This is post 1",
    author: ObjectId("60a6e4e0e8e8e8e8e8e8e8e8"),
    publication_date: new Date(),
    stats: {
      likes: 5,
      responses: 2,
      reposts: 1
    }
  },
  {
    content: "This is post 2",
    author: ObjectId("60a6e4e0e8e8e8e8e8e8e8e8"),
    publication_date: new Date(),
    stats: {
      likes: 10,
      responses: 3,
      reposts: 2
    }
  },
]);

// Get the user and post IDs to use in the likes and reposts collections

const userIds = []

const users = db.users.find({}).toArray()
for (const user of users) {
  userIds.push(user._id)
}

const postIds = []

const posts = db.posts.find({}).toArray()
for (const post of posts) {
  postIds.push(post._id)
}

// Insert test documents in the "likes" collection

const likes = []

for (let i = 0; i < userIds.length; i++) {
  const like = {
    user: userIds[i],
    post: postIds[i],
    like_date: new Date()
  }
  likes.push(like)
}

db.likes.insertMany(likes);

// Insert test documents in the "reposts" collection

const reposts = []

for (let i = 0; i < userIds.length; i++) {
  const like = {
    user: userIds[i],
    post: postIds[i],
    repost_date: new Date()
  }
  reposts.push(like)
}

db.reposts.insertMany(reposts);

// Insert test documents in the "followers" collection

const followers = [{
  follower: userIds[0],
  following: userIds[1],
  follow_date: new Date()
},
{
  follower: userIds[1],
  following: userIds[0],
  follow_date: new Date()
},]

db.followers.insertMany(followers);
