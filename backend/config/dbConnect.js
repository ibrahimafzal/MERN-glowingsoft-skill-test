const mongoose = require("mongoose")

const dbConnect = () => {
    try {
        mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB connected successfully!")
        
    } catch (error) {
        console.log("MongoDB error!")
        throw new Error(error.message)
    }
}

module.exports = dbConnect