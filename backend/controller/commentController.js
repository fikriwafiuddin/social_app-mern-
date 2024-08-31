import Comment from "../models/commentModel.js"
import Post from "../models/postModel.js"

export const addComment = async (req, res) => {
  const user = req.user
  const postId = req.params.postId
  const { comment } = req.body
  console.log(comment)
  try {
    let post = await Post.findById(postId)
    if (!post) {
      return res.status(404).json("Post not found")
    }

    const newComment = new Comment({
      content: comment,
      author: user._id,
      blogPost: postId,
    })
    const savedComment = await newComment.save()

    post.comments.push(savedComment._id)
    await post.save()

    post = await Post.findById(postId)
      .populate("author", "username")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "username",
        },
      })

    return res.status(200).json(post)
  } catch (error) {
    console.error(error)
    res.status(400).json("System error")
  }
}

export const deleteComment = async (req, res) => {
  const commentId = req.params.commentId
  try {
    const comment = await Comment.findById(commentId)
    if (!comment) {
      return res.status(404).send("Comment not found")
    }

    const blogPost = await Post.findById(comment.blogPost)
    if (blogPost) {
      const index = blogPost.comments.indexOf(commentId)
      if (index > -1) {
        blogPost.comments.splice(index, 1)
      }
      await blogPost.save()
    }

    await Comment.findByIdAndDelete(commentId)
    res.send("Comment deleted")
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export const like = async (req, res) => {
  const user = req.user._id
  const slug = req.params.slug
  try {
    const post = await Post.findByOne({ slug })
    if (!post) {
      return res.status(404).json("Post not found")
    }

    post.likes.push(user)
    await post.save()
    res.status(200).json("Success")
  } catch (error) {
    console.error(error)
    res.status(400).json("System error")
  }
}

export const dislike = async (req, res) => {
  const slug = req.params.slug
  const userId = req.body.userId
  try {
    const blogPost = await Post.findOne({ slug })

    if (!blogPost) {
      return res.status(404).send("Blog post not found")
    }

    const index = blogPost.likes.indexOf(userId)
    if (index > -1) {
      blogPost.likes.splice(index, 1)
    }

    await blogPost.save()
    res.send("Success")
  } catch (error) {
    console.error(error)
    res.status(500).send(error.message)
  }
}
