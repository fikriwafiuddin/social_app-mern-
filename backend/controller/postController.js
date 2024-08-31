import Comment from "../models/commentModel.js"
import Post from "../models/postModel.js"
import mongoose from "mongoose"

export const getPost = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate("author")

    res.status(200).json(posts)
  } catch (error) {
    console.error(error)
  }
}

export const getUserPosts = async (req, res) => {
  const { id } = req.params
  try {
    const posts = await Post.find({ author: id })
      .sort({ createdAt: -1 })
      .populate("author")

    res.status(200).json(posts)
  } catch (error) {
    console.error(error)
  }
}

export const detailPost = async (req, res) => {
  const id = req.params.id
  try {
    const post = await Post.findById(id)
      .populate("author", "username")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "username",
        },
      })
    if (!post) {
      return res.status(401).json("Post not found")
    }

    return res.status(200).json(post)
  } catch (error) {
    console.error(error)
    res.status(400).json("System error")
  }
}

export const createPost = async (req, res) => {
  const user = req.user
  const { content } = req.body
  try {
    await Post.create({ content, author: user._id })
    return res.status(200).json("Success")
  } catch (error) {
    console.error(error)
    res.status(400).json("System error")
  }
}

export const deletePost = async (req, res) => {
  const id = req.params.id
  try {
    const post = await Post.findById(id)
    if (!post) {
      return res.status(404).json("Blog not found")
    }

    await Post.deleteOne({ _id: id })
    return res.status(200).json("Success")
  } catch (error) {
    console.error(error)
    res.status(400).json("System error")
  }
}

export const editPost = async (req, res) => {
  const { content, id } = req.body
  try {
    const post = await Post.findById(id)
    if (!post) {
      return res.status(404).json("Blog not found")
    }

    await Post.findByIdAndUpdate(id, { title, content })
    return res.status(200).json("Success")
  } catch (error) {
    console.error(error)
    res.status(400).json("System error")
  }
}

export const like = async (req, res) => {
  try {
    const { id } = req.params
    const user = req.user

    const post = await Post.findById(id)
    if (!post) return res.status(404).json({ message: "Post not found" })

    if (!post.likes.includes(user._id)) {
      post.likes.push(user._id)
      await post.save()
      res.status(200).json("Success")
    } else {
      res.status(400).json("Post already liked")
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

export const unlike = async (req, res) => {
  try {
    const { id } = req.params
    const user = req.user

    const post = await Post.findById(id)
    if (!post) return res.status(404).json("Post not found")

    if (post.likes.includes(user._id)) {
      post.likes.pull(user._id)
      await post.save()
      res.status(200).json("Post unliked")
    } else {
      res.status(400).json("Post not liked yet")
    }
  } catch (err) {
    console.error(err)
    res.status(500).json("Server error")
  }
}
