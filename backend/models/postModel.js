import mongoose from "mongoose"
const Schema = mongoose.Schema

const postSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  content: {
    type: String,
    required: true,
  },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
})

const Post = mongoose.model("Post", postSchema)
export default Post
