import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.routes.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
app.use(cors({
    origin : "http://127.0.0.1:5500",
    credentials : true
}))


app.get("/",(req,res) => {
    res.json({success: true,message : "All done"})
})

app.use("/api/v1/user",userRouter)

export {app}