import express from "express"
import route from "./router.js"
import connectDb from "./utils/db.js"
import cors from "cors"

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ credentials: true, origin: "http://localhost:5173" }))
connectDb()
app.use(route)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
