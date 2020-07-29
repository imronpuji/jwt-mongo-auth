const mongoose = require('mongoose')

const siswaSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        min : 6 ,
        max : 255
    }, 
    email : {
        type : String,
        required : true,
        min : 6 ,
        max : 255
    },  
    _idKelas : {
        type : String,
        required : true,
        min : 6,
        max : 255
    }, 
    NISN : {
        type : String,
        required : true,
        min : 6,
        max : 1024
    },
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model("Siswa", siswaSchema)
