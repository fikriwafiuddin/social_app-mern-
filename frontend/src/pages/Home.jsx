import Navbar from "../components/Navbar"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchPosts, likePost, unlikePost } from "../redux//slices/postSlice.js"
import { useNavigate } from "react-router-dom"
import { fetchMe } from "../redux/slices/userSlice"
import Loading from "../components/Loading.jsx"
import { Comment, LikeFill, LikeOutline } from "../atoms/svg"

function Home() {
  const dispatch = useDispatch()
  const { posts, isLoading } = useSelector((state) => state.posts)
  const {
    me,
    isLoading: userLoading,
    error,
  } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const token = localStorage.getItem("user")

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  useEffect(() => {
    if (token) dispatch(fetchMe(token))
  }, [dispatch, token])

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

  if (!token) navigate("/login")
  if (userLoading) return <Loading />
  if (error) {
    localStorage.removeItem("user")
    navigate("/login")
  }
  if (isLoading || !me) return <Loading />

  return (
    <>
      <Navbar />
      <main className="mt-28 lg:mt-24 mx-auto px-2">
        <ul className="mx-auto w-full max-w-2xl flex gap-4 flex-col">
          {posts.map((value, index) => (
            <li key={index}>
              <div className="relative w-full p-6 pb-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a
                  href={`/user/${value.author.username}`}
                  className="flex gap-1"
                >
                  <img
                    className="h-6 w-6 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  @{value.author.username}
                </a>
                <small>{formatDate(value.createdAt)}</small>
                <p className="text-start">{value.content}</p>
                <div className="absolute flex right-0 bottom-0 gap-2 mr-1 mb-1">
                  <div className="leading-[10px] flex flex-col justify-center">
                    <a
                      href={`/post/${value._id}`}
                      type="submit"
                      className="text-black"
                    >
                      <Comment />
                    </a>
                    <small className="mx-auto">{value.comments.length}</small>
                  </div>
                  <div className="leading-[10px] flex flex-col justify-center">
                    <button
                      type="button"
                      className={`bg-transparent ${
                        value.likes.includes(me._id) && "text-red-500"
                      }`}
                      onClick={() =>
                        value.likes.includes(me._id)
                          ? handleUnlike(value._id)
                          : handleLike(value._id, value.content)
                      }
                    >
                      {value.likes.includes(me._id) ? (
                        <LikeFill />
                      ) : (
                        <LikeOutline />
                      )}
                    </button>
                    <small className="mx-auto">{value.likes.length}</small>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export default Home
