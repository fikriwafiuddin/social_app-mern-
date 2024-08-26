import mongoose from "mongoose"
import "dotenv/config"

const connectDb = () => {
  mongoose.connect(process.env.MONGO_URI)
  const db = mongoose.connection
  db.on("error", (error) => {
    console.log(error)
  })
  db.once("open", () => {
    console.log("Database Connected...")
  })
}

export default connectDb
