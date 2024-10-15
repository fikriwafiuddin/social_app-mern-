import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL } from "../../../BASE_URL"

const token = localStorage.getItem("user")

export const fetchMe = createAsyncThunk(
  "user/fetchMe",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/getMe`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const searchUser = createAsyncThunk(
  "user/searchUser",
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/searchUser?q=${query}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (username, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/${username}`)

      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const follow = createAsyncThunk(
  "user/follow",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/follow/${id}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (error) {
      console.log(error.response.data)
      return rejectWithValue(error.response.data)
    }
  }
)

export const unfollow = createAsyncThunk(
  "user/unfollow",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/unfollow/${id}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (error) {
      console.log(error.response.data)
      return rejectWithValue(error.response.data)
    }
  }
)

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    users: [],
    me: null,
    isLoading: true,
    isLoading2: true,
    isBtnLoading: false,
    isLogin: false,
    error: null,
  },
  reducers: {
    resetUser(state) {
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.me = action.payload
        state.isLoading = false
        state.isLogin = true
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.isLogin = false
      })
      .addCase(searchUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(searchUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload
      })
      .addCase(searchUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload ? action.payload : action.error.message
        state.users = []
      })
      .addCase(fetchUser.pending, (state) => {
        state.isLoading2 = true
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading2 = false
        state.isLogin = true
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading2 = false
        state.error = action.payload
        state.isLogin = false
      })
      .addCase(follow.pending, (state) => {
        state.isBtnLoading = true
      })
      .addCase(follow.fulfilled, (state, action) => {
        const id = action.payload
        state.user.followers.push(id)
        state.isBtnLoading = false
      })
      .addCase(unfollow.pending, (state) => {
        state.isBtnLoading = true
      })
      .addCase(unfollow.fulfilled, (state, action) => {
        const id = action.payload
        state.user.followers = state.user.followers.filter(
          (value) => value !== id
        )
        state.isBtnLoading = false
      })
  },
})

export const { resetUser } = userSlice.actions

export default userSlice.reducer
