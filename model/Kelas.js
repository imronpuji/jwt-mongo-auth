const mongoose = require('mongoose')


const KelasSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        min : 6 ,
        max : 255
    },
    _idSekolah : {
        type : String,
        required : true,
        min : 6,
    },
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model("Kelas", KelasSchema)