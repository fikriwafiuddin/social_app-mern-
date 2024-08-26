import express from "express"
import {
  detaiUser,
  follow,
  getMe,
  login,
  register,
  searchUser,
  unfollow,
} from "./controller/userController.js"
import {
  createPost,
  detailPost,
  getPost,
  getUserPosts,
  like,
  unlike,
} from "./controller/postController.js"
import { verifyToken } from "./middleware/authMiddleware.js"
import { addComment } from "./controller/commentController.js"
const route = express()

route.get("/", getPost)
route.get("/detailPost/:id", detailPost)
route.post("/register", register)
route.post("/login", login)
route.get("/getMe", verifyToken, getMe)
route.get("/user/:username", detaiUser)

route.post("/createPost", verifyToken, createPost)
route.get("/posts/:id", getUserPosts)
route.post("/like/:id", verifyToken, like)
route.post("/unlike/:id", verifyToken, unlike)
route.post("/follow/:id", verifyToken, follow)
route.post("/unfollow/:id", verifyToken, unfollow)
route.get("/searchUser", searchUser)

route.post("/eddComment/:postId", verifyToken, addComment)

export default route
