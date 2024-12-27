const express = require('express')
require('dotenv').config()
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT 
const mongo_url = process.env.MONGO_URL
app.use(express.json())




app.use('/api/user', require('./controllers/user.controller'))

// database connection 

mongoose.connect(mongo_url).then(()=>{
    console.log("Database connected")
    app.listen(port, ()=>{
        console.log(`Server is running on port ${port}`)
    })
}).catch((error)=>{
    console.log("Error connecting to database", error)
})