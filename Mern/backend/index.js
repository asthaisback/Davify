const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')


const app = express()
app.use(cors(
    {
       // origin:process.env.FRONTEND_URL,
    origin : 'http://localhost:3000',
    credentials : true
}
));
app.use(express.json())
app.use(cookieParser())

app.use("/api",router)

const PORT = 8080 || process.env.PORT


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("connnect to DB")
        console.log("Server is running "+PORT)
    })
})

// How Promises Work Here:

// connectDB() initiates a potentially time-consuming operation (connecting to the database).
// Since Promises are used, the server doesn't wait (block) for the database connection to complete before moving on to other tasks
// When the database connection is successful, the Promise returned by connectDB() is resolved.
// The .then() method is triggered, and the server starts listening on the specified port, with confirmation messages being logged.