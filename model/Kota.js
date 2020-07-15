const mongoose = require('mongoose')


const KotaSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        min : 6 ,
        max : 255
    },
    NK : {
        type : Number,
        required : true,
        min : 6,
    },
    _idProvinsi : {
        type : String,
        required : true,
        min : 6,
    },
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model("Kota", KotaSchema)