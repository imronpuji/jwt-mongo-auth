const mongoose = require('mongoose')


const provinsiSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        min : 6 ,
        max : 255
    },
    NP : {
        type : Number,
        required : true,
        min : 6,
    },
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model("Provinsi", provinsiSchema)