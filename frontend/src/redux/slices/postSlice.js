import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3000`)
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
      const response = await axios.get(`http://localhost:3000/posts/${id}`)
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
        `http://localhost:3000/like/${postId}`,
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
        `http://localhost:3000/unlike/${postId}/`,
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

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    isLoading: false,
    error: null,
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
  },
})

export const { incrementPage } = postSlice.actions

export default postSlice.reducer
