import express from "express"
import route from "./router.js"
import connectDb from "./utils/db.js"
import cors from "cors"
import "dotenv/config"

const app = express()
const port = process.env.PORT

app.use(express.json())
const corsOptions = {
  origin: ["https://social-app-lac.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}
app.use(cors(corsOptions))
connectDb()
app.use(route)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
