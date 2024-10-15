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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
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
