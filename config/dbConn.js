// Database connection for MongoDB
const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
    } catch (err) {
        console.log(err)
    }
}
module.exports = connectDB

// Connect to multiple databases 