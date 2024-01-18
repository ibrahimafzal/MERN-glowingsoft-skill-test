const express = require("express")
const app = express()
const cors = require("cors")
const dbConnect = require("./config/dbConnect")
const userRoutes = require("./routes/userRoutes")
const carRoutes = require("./routes/carRoutes")

require("dotenv").config()


app.use(cors())
app.use(express.json())

dbConnect()

//Routes
app.use("/user", userRoutes)
app.use("/car", carRoutes)


const PORT = process.env.PORT
app.listen(PORT || 5000, () => {
    console.log("SERVER RUNNING")
})