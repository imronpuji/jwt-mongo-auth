const express = require('express')
const app = express()
const authRoutes = require('./routes/auth')
const mongoose = require('mongoose')
const dotenv = require('dotenv') 
const dashboard = require('./routes/dashboard')
const verifyToken = require('./routes/validate-token')
const cors = require("cors")
const admin = require('./routes/admin')
const sekolah = require('./routes/sekolah')
dotenv.config();

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.DB_CONNECT,{
    useNewUrlParser : true,
    useUnifiedTopology : true
}, () => console.log('database connected'))

app.use('/api/user', authRoutes)
app.use('/api/admin',verifyToken, admin)
app.use('/api/sekolah',verifyToken, sekolah)
app.use('/api/dashboard', verifyToken, dashboard)
app.listen(3000, () => console.log('server is connected'))