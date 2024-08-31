import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
import "dotenv/config"

export const verifyToken = async (req, res, next) => {
  let token = req.headers.authorization
  try {
    if (!token && !token.startsWith("Bearer")) {
      return res.status(401).send("Unauthorized")
    }

    token = req.headers.authorization.split(" ")[1]

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id).select("-password")
    if (!user) return res.status(401).json("User not found")
    req.user = user
    next()
  } catch (error) {
    console.log(error)
    return res.status(403).json("Invalid token")
  }
}
