import mongoose from "mongoose"
const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  blogPost: { type: Schema.Types.ObjectId, ref: "Post" },
  createdAt: { type: Date, default: Date.now },
})

const Comment = mongoose.model("Comment", commentSchema)
export default Comment
