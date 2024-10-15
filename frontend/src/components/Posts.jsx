import {
  deletePost,
  fetchUserPosts,
  likePost,
  unlikePost,
} from "../redux/slices/postSlice"
import { useDispatch } from "react-redux"
import PropTypes from "prop-types"
import { Comment, LikeFill, LikeOutline } from "../atoms/svg"
import { useState } from "react"
import { useSelector } from "react-redux"

function Posts({ posts, me, option }) {
  const [isOpen, setIsOpen] = useState(null)

  const dispatch = useDispatch()
  const token = localStorage.getItem("user")

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

  const handleOpen = (i) => {
    setIsOpen(isOpen ? null : i)
  }

  const handleDelete = (id) => {
    dispatch(deletePost({ id, token }))
  }

  return (
    <ul className="mx-auto w-full max-w-2xl flex gap-4 flex-col">
      {posts.map((value, index) => (
        <li key={index}>
          <div className="relative w-full p-6 pb-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            {option && (
              <div className="absolute top-0 right-0 mt-2">
                <div className="relative">
                  <button
                    type="button"
                    className="bg-transparent"
                    onClick={() => handleOpen(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <div
                    className={`${
                      isOpen === index ? "" : "hidden"
                    } absolute right-0 mr-2 p-2 shadow-lg text-red-500`}
                  >
                    <button
                      onClick={() => handleDelete(value._id)}
                      type="button"
                      className="text-xs flex items-center bg-transparent"
                    >
                      Delete{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-3"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
            <a href={`/user/${value.author.username}`} className="flex gap-1">
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
                <button type="submit" className="bg-transparent">
                  <Comment />
                </button>
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
  )
}

Posts.propTypes = {
  posts: PropTypes.array,
  me: PropTypes.object,
  option: PropTypes.bool,
}

export default Posts
