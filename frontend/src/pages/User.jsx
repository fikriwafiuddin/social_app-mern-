import { useNavigate, useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useEffect } from "react"
import Loading from "../components/Loading"
import { useDispatch, useSelector } from "react-redux"
import { fetchMe, fetchUser, follow, unfollow } from "../redux/slices/userSlice"
import { fetchUserPosts } from "../redux/slices/postSlice"
import Posts from "../components/Posts"

function User() {
  const dispatch = useDispatch()
  const { user, me, isLoading1, isLoading2, isBtnLoading } = useSelector(
    (state) => state.user
  )
  const {
    posts,
    error,
    isLoading: postLoading,
  } = useSelector((state) => state.posts)
  const navigate = useNavigate()
  const { username } = useParams()
  const token = localStorage.getItem("user")
  console.log(user)

  useEffect(() => {
    dispatch(fetchMe(token))
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchUser(username))
  }, [dispatch, username])

  useEffect(() => {
    if (user) {
      dispatch(fetchUserPosts({ id: user._id }))
    }
  }, [isLoading2, dispatch])

  if (isLoading2 || isLoading1) {
    return <Loading />
  }

  const handleFollow = () => {
    if (user) {
      dispatch(follow({ id: user._id }))
    }
  }

  const handleUnfollow = () => {
    if (user) {
      dispatch(unfollow({ id: user._id }))
    }
  }

  if (error) return <h1>error</h1>
  if (username === me.username) navigate("/me")

  return (
    <>
      <Navbar />
      <main className="mt-28 lg:mt-24 mx-auto px-2 pb-24">
        <div className="mb-8 mx-auto w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col items-center pb-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-24"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                clipRule="evenodd"
              />
            </svg>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {user.username}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {user.name}
            </span>
            <div className="flex mt-4 md:mt-6">
              {user.followers.includes(me._id) ? (
                <button
                  onClick={handleUnfollow}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  disabled={isBtnLoading}
                >
                  {isBtnLoading ? "Loading..." : "Unfollow"}
                </button>
              ) : (
                <button
                  onClick={handleFollow}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  disabled={isBtnLoading}
                >
                  {isBtnLoading ? "Loading..." : "Follow"}
                </button>
              )}
              <a
                href="#"
                className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Message
              </a>
            </div>
            <div className="mt-5 flex">
              <div className="flex flex-col items-center">
                <span className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                  Follower
                </span>
                <small className="me-2">{user.followers.length}</small>
              </div>
              <div className="flex flex-col items-center">
                <span className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                  Following
                </span>
                <small className="me-2">{user.following.length}</small>
              </div>
              <div className="flex flex-col items-center">
                <span className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                  Post
                </span>
                <small className="me-2">{posts.length}</small>
              </div>
            </div>
          </div>
        </div>
        {postLoading || isLoading1 ? (
          <Loading />
        ) : (
          <Posts posts={posts} me={me} />
        )}
      </main>
    </>
  )
}

export default User
