import connectDb from "./utils/db.js"
import User from "./models/userModel.js"
import bcrypt from "bcrypt"
import Post from "./models/postModel.js"
import Comment from "./models/commentModel.js"
connectDb()

// const saltRounds = 10

// class UserClass {
//   constructor(username, name, email, password) {
//     this.username = username
//     this.name = name
//     this.email = email
//     this.password = bcrypt.hashSync(password, saltRounds)
//   }
// }

// const users = [
//   new UserClass("john_doe", "John Doe", "john.doe@example.com", "password123"),
//   new UserClass(
//     "jane_smith",
//     "Jane Smith",
//     "jane.smith@example.com",
//     "password456"
//   ),
//   new UserClass(
//     "alice_johnson",
//     "Alice Johnson",
//     "alice.johnson@example.com",
//     "password789"
//   ),
//   new UserClass(
//     "bob_brown",
//     "Bob Brown",
//     "bob.brown@example.com",
//     "password101"
//   ),
//   new UserClass(
//     "charlie_davis",
//     "Charlie Davis",
//     "charlie.davis@example.com",
//     "password202"
//   ),
//   new UserClass(
//     "diana_evans",
//     "Diana Evans",
//     "diana.evans@example.com",
//     "password303"
//   ),
//   new UserClass(
//     "evan_green",
//     "Evan Green",
//     "evan.green@example.com",
//     "password404"
//   ),
//   new UserClass(
//     "fiona_harris",
//     "Fiona Harris",
//     "fiona.harris@example.com",
//     "password505"
//   ),
//   new UserClass(
//     "george_king",
//     "George King",
//     "george.king@example.com",
//     "password606"
//   ),
//   new UserClass(
//     "hannah_lee",
//     "Hannah Lee",
//     "hannah.lee@example.com",
//     "password707"
//   ),
// ]

// const posts = [
//   "Had a great day at the beach! 🌊☀️",
//   "Just finished reading an amazing book! 📚",
//   "Can't believe how beautiful the sunset was today. 🌅",
//   "Feeling grateful for all the wonderful people in my life. ❤️",
//   "Just tried a new recipe and it turned out delicious! 🍲",
//   "Exploring new places and making memories. 🗺️",
//   "Workout done! Feeling strong and energized. 💪",
//   "Enjoying a cozy night in with a good movie. 🎥",
//   "Nature walks are the best therapy. 🌳",
//   "Celebrating small victories every day. 🎉",
//   "Coffee in hand, ready to tackle the day! ☕",
//   "Spending quality time with family. 👨‍👩‍👧‍👦",
//   "Learning something new every day. 📖",
//   "Grateful for the little things in life. 🌸",
//   "Just finished a great workout session! 🏋️",
//   "Loving the new season's fashion trends. 👗",
//   "Weekend vibes are the best vibes. 😎",
//   "Feeling inspired and motivated. ✨",
//   "Enjoying a peaceful morning with a cup of tea. 🍵",
//   "Just baked some delicious cookies! 🍪",
//   "Adventures are the best way to learn. 🌍",
//   "Feeling blessed and thankful. 🙏",
//   "Just finished a challenging project at work. 💼",
//   "Spending the day with my favorite people. 💕",
//   "Enjoying the simple pleasures of life. 🌼",
//   "Just watched an incredible documentary. 🎬",
//   "Feeling refreshed after a good night's sleep. 😴",
//   "Exploring new hobbies and interests. 🎨",
//   "Just had the best meal ever! 🍽️",
//   "Feeling positive and optimistic. 🌞",
//   "Just finished a great book! 📚",
//   "Enjoying a relaxing day at home. 🏡",
//   "Feeling accomplished after a productive day. ✅",
//   "Just had a fun day out with friends. 🎉",
//   "Loving the beautiful weather today. ☀️",
//   "Feeling creative and inspired. 🎨",
//   "Just finished a great workout! 💪",
//   "Enjoying a peaceful evening. 🌙",
//   "Feeling grateful for all the support. ❤️",
//   "Just tried a new hobby and loved it! 🎣",
//   "Feeling happy and content. 😊",
//   "Just finished a challenging workout. 🏋️",
//   "Enjoying a delicious meal with loved ones. 🍲",
//   "Feeling motivated to achieve my goals. 🎯",
//   "Just had a great conversation with a friend. 💬",
//   "Feeling relaxed and at peace. 🧘",
//   "Just finished a productive day at work. 💼",
//   "Enjoying a beautiful day outdoors. 🌳",
//   "Feeling thankful for all the blessings. 🙏",
// ]

// const addPost = async (data) => {
//   const newPost = []
//   posts.forEach((value) => {
//     const likes = []
//     const random = Math.floor(Math.random() * 10)
//     for (let i = 0; i < random; i++) {
//       likes.push(data[Math.floor(Math.random() * 10)]._id)
//     }
//     newPost.push({
//       content: value,
//       author: data[Math.floor(Math.random() * 10)]._id,
//       likes,
//     })
//   })
//   await Post.create(newPost)
//   console.log("Success")
// }

// User.create(users)
//   .then((res) => addPost(res))
//   .catch((err) => console.log(err))

Comment.create({
  content: "ok",
  author: "66b6df82b66b9674be1455e3",
  blogPost: "66b9b170929f17009f9b4303",
})
  .then((res) => console.log(res))
  .catch((err) => console.log(err))

// User.deleteMany().then(() => console.log("Success"))
// Post.deleteMany().then(() => console.log("Success"))
