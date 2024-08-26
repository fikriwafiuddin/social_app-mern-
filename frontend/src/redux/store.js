import { configureStore } from "@reduxjs/toolkit"
import postReducer from "./slices/postSlice.js"
import userReducer from "./slices/userSlice.js"

const store = configureStore({
  reducer: {
    posts: postReducer,
    user: userReducer,
  },
})

export default store
