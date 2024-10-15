import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import "dotenv/config"
import validator from "validator"

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" })
}

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json("User not found")
    }

    const comparePassword = await bcrypt.compare(password, user.password)
    if (!comparePassword) {
      return res.status(400).json("Password is wrong")
    }
    return res.status(200).json(generateToken(user._id))
  } catch (error) {
    console.error(error)
    res.status(500).json("System error")
  }
}

export const register = async (req, res) => {
  const { username, email, password, password2, name } = req.body
  try {
    if (!username || !email || !password || !password2) {
      return res.status(400).json("Please add all fields")
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Email is not valid" })
    }
    const emailUser = await User.findOne({ email })
    if (emailUser) {
      return res.status(400).json("User already exist!")
    }
    const isUsername = await User.findOne({ username })
    if (isUsername) {
      return res.status(400).json("This username already exist")
    }

    if (password !== password2) {
      return res.status(400).json("Please add confirm password correctly")
    }

    const decoded = bcrypt.hashSync(password, 10)

    const newUser = new User({ username, name, email, password: decoded })
    await newUser.save()
    return res.status(200).json(generateToken(newUser._id))
  } catch (error) {
    console.error(error)
    res.status(500).json("System error")
  }
}

export const getMe = async (req, res) => {
  try {
    const user = req.user

    return res.status(200).json(user)
  } catch (error) {
    res.status(500).json("System error")
  }
}

export const detaiUser = async (req, res) => {
  const username = req.params.username
  try {
    const user = await User.findOne({ username })
      .select("-email")
      .select("-password")
    if (!user) {
      return res.status(404).json("User not found")
    }

    return res.status(200).json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json("System error")
  }
}

export const follow = async (req, res) => {
  try {
    const { id } = req.params
    const me = req.user

    const user = await User.findById(id)
    if (!user) return res.status(404).json("User not found")

    if (!user.followers.includes(me._id)) {
      user.followers.push(me._id)
      await user.save()
      me.following.push(id)
      await me.save()
      res.status(200).json(me._id)
    } else {
      res.status(400).json("User already liked")
    }
  } catch (err) {
    console.error(err)
    res.status(500).json("Server error")
  }
}

export const unfollow = async (req, res) => {
  try {
    const { id } = req.params
    const me = req.user

    const user = await User.findById(id)
    if (!user) return res.status(404).json("User not found")

    if (user.followers.includes(me._id)) {
      user.followers.pull(me._id)
      await user.save()
      me.following = me.following.filter((value) => value != id)
      await me.save()
      res.status(200).json(me._id)
    } else {
      res.status(400).json("User not follow this user")
    }
  } catch (err) {
    console.error(err)
    res.status(500).json("Server error")
  }
}

export const searchUser = async (req, res) => {
  const { q } = req.query

  if (!q) {
    return res.status(400).json({ message: "Query is required" })
  }

  try {
    const users = await User.find(
      {
        $or: [
          { username: { $regex: q, $options: "i" } },
          { name: { $regex: q, $options: "i" } },
        ],
      },
      {
        username: 1,
        name: 1,
      }
    )

    return res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}
