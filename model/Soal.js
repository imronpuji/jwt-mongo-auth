const mongoose = require('mongoose')


const KelasSchema = new mongoose.Schema({
    _idUjian : {
        type : String,
        required : true,
        min : 6,
    },
    soal : {
        type : String,
        required : true,
        min : 6,
    },
    A : {
        type : String,
        required : true,
        min : 6,
    },
    B : {
        type : String,
        required : true,
        min : 6,
    },
    C : {
        type : String,
        required : true,
        min : 6,
    },
    D : {
        type : String,
        required : true,
        min : 6,
    },
    jawaban_benar : {
        type : String,
        required : true,
        min : 1,
    },
    bobot_soal : {
        type : String,
        required : true,
        min : 1,
    },
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model("Soal", KelasSchema)