const express = require("express")
const connectDB = require("./config/db")
const cors = require("cors")
const authRoute = require("./routes/authRoute")
const postRoute = require("./routes/postRoute")
require("dotenv").config()
const PORT = process.env.PORT || 5000;
const app = express()


app.use(cors())
app.use(express.json())

connectDB()

app.get("/",(req,res)=>{
    res.send("blog platform api is running")
})
app.use("/api/auth/register",authRoute);
app.use("/api/auth",postRoute)

app.listen(PORT,()=>{
    console.log(`mongodb server started at port ${PORT}`)
})
