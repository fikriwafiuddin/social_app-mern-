import express from "express"
import route from "./router.js"
import connectDb from "./utils/db.js"
import cors from "cors"
import "dotenv/config"

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(cors("https://social-app-lac.vercel.app"))
connectDb()
app.use(route)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
