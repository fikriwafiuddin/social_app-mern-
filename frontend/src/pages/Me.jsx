import Navbar from "../components/Navbar"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchMe } from "../redux/slices/userSlice"
import Loading from "../components/Loading"
import { useNavigate } from "react-router-dom"
import { fetchUserPosts } from "../redux/slices/postSlice"
import Posts from "../components/Posts"

function Me() {
  const dispatch = useDispatch()
  const { me, isLoading1 } = useSelector((state) => state.user)
  const {
    posts,
    error,
    isLoading: postLoading,
  } = useSelector((state) => state.posts)
  const navigate = useNavigate()
  const token = localStorage.getItem("user")

  useEffect(() => {
    dispatch(fetchMe(token))
  }, [dispatch, token])

  const handleLogout = () => {
    localStorage.removeItem("user")
    navigate("/")
  }

  useEffect(() => {
    if (!isLoading1) {
      dispatch(fetchUserPosts({ id: me._id }))
    }
  }, [isLoading1])

  if (isLoading1 || !me) {
    return <Loading />
  }
  if (error) return <h1>error</h1>

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
              {me.username}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {me.name}
            </span>
            <div className="flex mt-4 md:mt-6">
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Logout
              </button>
            </div>
            <div className="mt-5 flex">
              <div className="flex flex-col items-center">
                <span className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                  Follower
                </span>
                <small className="me-2">{me.followers.length}</small>
              </div>
              <div className="flex flex-col items-center">
                <span className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                  Following
                </span>
                <small className="me-2">{me.following.length}</small>
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

export default Me
