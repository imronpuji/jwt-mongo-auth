const mongoose = require('mongoose')


const UjianSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        min : 6 ,
        max : 255
    },
    _idKelas : {
        type : String,
        required : true,
        min : 6,
    },
    waktu : {
        type : String,
        required : true,
        min : 6,
    },
    tgl : {
        type : String,
        required : true,
        min : 6,
    },
    lama_ujian : {
        type : String,
        required : true,
        min : 1,
        max : 1
    },
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model("Ujian", UjianSchema)