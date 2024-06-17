console.log('starting script');

use('lines');

db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["username", "name", "email", "password", "follower_count"],
      properties: {
        username: {
          bsonType: "string",
          pattern: "^[1-9a-zA-Z_]+$",
          description: "must be a string and contain only alphanumerics and underscores",
          minLength: 4,
          maxLength: 15,
          unique: true
        },
        name: {
          bsonType: "string",
          description: "must be a string and is required",
          maxLength: 50
        },
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          description: "must be a string and match the email pattern",
          unique: true
        },
        password: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        follower_count: {
          bsonType: "int",
          minimum: 0,
          description: "must be an int and is required"
        },
        profilePic: {
          bsonType: "object",
          required: ["url", "size", "width", "height"],
          properties: {
            url: {
              bsonType: "string",
              pattern: "^(https?|ftp)://[^\\s/$.?#].[^\\s]*$",
              description: "must be a valid URI and is required"
            },
            size: {
              bsonType: "int",
              description: "must be an int and is required"
            },
            width: {
              bsonType: "int",
              description: "must be an int and is required"
            },
            height: {
              bsonType: "int",
              description: "must be an int and is required"
            }
          }
        },
        bio: {
          bsonType: "string",
          description: "must be a string and is required"
        }
      }
    }
  }
});

db.createCollection("posts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["content", "author", "publication_date", "stats"],
      properties: {
        content: {
          bsonType: "string",
          description: "must be a string and is required",
          maxLength: 280
        },
        author: {
          bsonType: "objectId",
          description: "must be an objectId referencing the user and is required"
        },
        parent_post: {
          bsonType: "objectId",
          description: "optional reference to the parent post if this is a response"
        },
        publication_date: {
          bsonType: "date",
          description: "must be a date and is required"
        },
        stats: {
          bsonType: "object",
          required: ["likes", "responses", "reposts"],
          properties: {
            likes: {
              bsonType: "int",
              minimum: 0,
              description: "must be an int and is required"
            },
            responses: {
              bsonType: "int",
              minimum: 0,
              description: "must be an int and is required"
            },
            reposts: {
              bsonType: "int",
              minimum: 0,
              description: "must be an int and is required"
            }
          }
        }
      }
    }
  }
});

db.createCollection("likes",{
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["user", "post", "like_date"],
      properties:{
        user: {
          bsonType: "objectId",
          description: "must be an objectId referencing the user and is required"
        },
        post: {
          bsonType: "objectId",
          description: "must be an objectId referencing the post and is required"
        },
        like_date: {
          bsonType: "date",
          description: "must be a date and is required"
        }
      }
    }
  }
});

db.createCollection("reposts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["user", "post", "repost_date"],
      properties: {
        user: {
          bsonType: "objectId",
          description: "must be an objectId referencing the user and is required"
        },
        post: {
          bsonType: "objectId",
          description: "must be an objectId referencing the post and is required"
        },
        repost_date: {
          bsonType: "date",
          description: "must be a date and is required"
        }
      }
    }
  }
});

db.createCollection("followers", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["follower", "following", "follow_date"],
      properties: {
        follower: {
          bsonType: "objectId",
          description: "must be an objectId referencing the user and is required"
        },
        following: {
          bsonType: "objectId",
          description: "must be an objectId referencing the user and is required"
        },
        follow_date: {
          bsonType: "date",
          description: "must be a date and is required"
        }
      }
    }
  }
});



// Indexes for users collection
db.users.createIndex({ username: 1 });

// Indexes for posts collection
db.posts.createIndex({ parent_post: 1 });
db.posts.createIndex({ "stats.likes": -1 });
db.posts.createIndex({ "stats.responses": -1 });
db.posts.createIndex({ "stats.reposts": -1 });
db.posts.createIndex({ author: 1, publication_date: -1 });

// Indexes for likes collection
db.likes.createIndex({ user: 1 });
db.likes.createIndex({ post: 1 });

// Indexes for reposts collection
db.reposts.createIndex({ user: 1, post: 1 });
db.reposts.createIndex({ repost_date: -1 });
db.reposts.createIndex({ user: 1 });
db.reposts.createIndex({ post: 1 });

// Indexes for followers collection
db.followers.createIndex({ follower: 1 });
db.followers.createIndex({ following: 1 });
db.followers.createIndex({ follower: 1, following: 1 });
db.followers.createIndex({ follow_date: -1 });

console.log('finished script');






