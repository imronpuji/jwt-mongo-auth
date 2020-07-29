const mongoose = require('mongoose')


const NilaiSchema = new mongoose.Schema({

    _idUjian : {
        type : String,
        required : true,
        min : 6,
    },
    _idSiswa : {
        type : String,
        required : true,
        min : 6,
    },
    nilai : {
        type : String,
        required : true,
        min : 1,
    },

    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model("Nilai", NilaiSchema)