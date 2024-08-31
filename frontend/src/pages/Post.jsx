import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Loading from "../components/Loading"
import Navbar from "../components/Navbar"
import { fetchMe } from "../redux/slices/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { likePost, unlikePost } from "../redux/slices/postSlice"
import { Comment, LikeFill, LikeOutline } from "../atoms/svg"
import { BASE_URL } from "../../BASE_URL"

function Post() {
  const [post, setPost] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [comment, setComment] = useState("")
  const [commentIsLoading, setCommentIsLoading] = useState(false)
  const { me } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()
  const token = localStorage.getItem("user")

  useEffect(() => {
    dispatch(fetchMe(token))
  }, [dispatch, token])

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/detailPost/${id}`)
        setPost(response.data)
      } catch (error) {
        console.log(error)
        navigate("*")
      } finally {
        setIsLoading(false)
      }
    }

    getPost()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setCommentIsLoading(true)
      const response = await axios.post(
        `${BASE_URL}/eddComment/${post._id}`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setPost(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setCommentIsLoading(false)
    }
  }

  const formatDate = (stringDate) => {
    const date = new Date(stringDate)
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }
    return date.toLocaleDateString("en-US", options)
  }

  const handleLike = (postId) => {
    if (me._id) {
      dispatch(likePost({ postId, id: me._id, token }))
    }
  }

  const handleUnlike = (postId) => {
    if (me._id) {
      dispatch(unlikePost({ postId, id: me._id, token }))
    }
  }

  if (isLoading || !post) return <Loading />

  return (
    <>
      <Navbar />
      <main className="mt-28 lg:mt-24 mx-auto px-2 pb-24">
        <div className="relative w-full max-w-2xl mx-auto p-6 pb-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href={`/user/${post.author.username}`} className="flex gap-1">
            <img
              className="h-6 w-6 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            @{post.author.username}
          </a>
          <small>{formatDate(post.createdAt)}</small>
          <p className="text-start">{post.content}</p>
          <div className="absolute flex right-0 bottom-0 gap-2 mr-1 mb-1">
            <div className="leading-[10px] flex flex-col justify-center">
              <button type="submit" className="bg-transparent">
                <Comment />
              </button>
              <small className="mx-auto">{post.comments.length}</small>
            </div>
            <div className="leading-[10px] flex flex-col justify-center">
              <button
                type="button"
                className={`bg-transparent ${
                  post.likes.includes(me._id) && "text-red-500"
                }`}
                onClick={() =>
                  post.likes.includes(me._id)
                    ? handleUnlike(post._id)
                    : handleLike(post._id, post.content)
                }
              >
                {post.likes.includes(me._id) ? <LikeFill /> : <LikeOutline />}
              </button>
              <small className="mx-auto">{post.likes.length}</small>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          method="post"
          className="mt-2 max-w-2xl mx-auto"
        >
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            id="message"
            rows="1"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
          ></textarea>
          <button
            disabled={commentIsLoading}
            type="submit"
            className="mt-1 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {commentIsLoading ? "Submitting..." : "Submit"}
          </button>
        </form>

        <ul className="mx-auto w-full max-w-2xl p-2 flex flex-col gap-2 mt-3">
          {post.comments.map((value) => (
            <li className="flex flex-col border-b-2 pb-1" key={value._id}>
              <span className="font-bold">{value.author.username}</span>
              <span>{value.content}</span>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export default Post
