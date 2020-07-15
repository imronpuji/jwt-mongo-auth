const mongoose = require('mongoose')


const SekolahSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        min : 6 ,
        max : 255
    },
    name : {
        type : String,
        required : true,
        min : 6 ,
        max : 255
    },
    NPSN : {
        type : Number,
        required : true,
        min : 6,
    },
    _idKota : {
        type : String,
        required : true,
        min : 6,
    },
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model("Sekolah", SekolahSchema)