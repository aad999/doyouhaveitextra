const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true]
    },
    emailId:{
        type:String,
        required:[true]
    },
    phoneNum: {
        type:Number,
        required: [true]
    },
    password:{
        type:String,
        required:[true]   
    },
},{timeStamps:true})

const donorModel = mongoose.model('donors',donorSchema)
module.exports=donorModel
