import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL } from "../../../BASE_URL"

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(BASE_URL)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const fetchUserPosts = createAsyncThunk(
  "posts/fetchUserPosts",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/posts/${id}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const likePost = createAsyncThunk(
  "posts/likePost",
  async ({ postId, id, token }, { rejectWithValue }) => {
    try {
      await axios.post(
        `${BASE_URL}/like/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      return { postId, id }
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const unlikePost = createAsyncThunk(
  "posts/unlikePost",
  async ({ postId, id, token }, { rejectWithValue }) => {
    try {
      await axios.post(
        `${BASE_URL}/unlike/${postId}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      return { postId, id }
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    isLoading: false,
    error: null,
    message: "",
  },
  reducers: {
    incrementPage(state) {
      state.page += 1
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload
        state.isLoading = false
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(fetchUserPosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.posts = action.payload
        state.isLoading = false
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const { postId, id } = action.payload
        state.posts = state.posts.map((post) =>
          post._id === postId ? { ...post, likes: [...post.likes, id] } : post
        )
      })
      .addCase(unlikePost.fulfilled, (state, action) => {
        const { postId, id } = action.payload
        state.posts = state.posts.map((post) =>
          post._id === postId
            ? { ...post, likes: post.likes.filter((userId) => userId !== id) }
            : post
        )
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.message = ""
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false
        state.message = action.payload
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload ? action.payload : action.error.message
        state.message = ""
      })
  },
})

export const { incrementPage } = postSlice.actions

export default postSlice.reducer
