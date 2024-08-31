import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import axios from "axios"
import { BASE_URL } from "../../BASE_URL"

function Search() {
  const [query, setQuery] = useState("")
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      if (!query) {
        setUsers([])
        return
      }

      setLoading(true)
      try {
        const response = await axios.get(`${BASE_URL}/searchUser?q=${query}`)
        setUsers(response.data)
      } catch (error) {
        console.error(error)
      }
      setLoading(false)
    }

    const delayDebounceFn = setTimeout(() => {
      fetchUsers()
    }, 300) // delay 300ms

    return () => clearTimeout(delayDebounceFn)
  }, [query])
  console.log(users)

  return (
    <>
      <Navbar />
      <main className="mt-28 lg:mt:24 mx-auto px-2">
        <div className="mt-28">
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full max-w-2xl mx-auto ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search here"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {/* <input
            type="text"
            
            placeholder="Search users..."
          />*/}
          {loading && <p>Loading...</p>}
          <ul className="max-w-2xl mx-auto mt-6 gap-3 flex flex-col">
            {users.map((user) => (
              <li
                className="border-b-2 flex gap-2 items-center p-2"
                key={user._id}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-8"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="flex flex-col gap-0">
                  <a href={`/user/${user.username}`}>
                    <span className="font-bold text-black">
                      {user.username}
                    </span>
                  </a>
                  <span className="text-sm">{user.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  )
}

export default Search
