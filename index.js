const express = require('express')
const app = express()
const authRoutes = require('./routes/auth')
const mongoose = require('mongoose')
const dotenv = require('dotenv') 

dotenv.config();

app.use(express.json())

mongoose.connect(process.env.DB_CONNECT,{
    useNewUrlParser : true,
    useUnifiedTopology : true
}, () => console.log('database connected'))

app.use('/api/user', authRoutes)

app.listen(3000, () => console.log('server is connected'))