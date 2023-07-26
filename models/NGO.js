const mongoose = require("mongoose");
const Donation = require("./Donation");

const ngoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true]
    },
    emailId: {
        type: String,
        required: [true]
    },
    phoneNum: {
        type: Number,
        required: [true]
    },
    verificationDoc: {
        type: String,
        required: [true]
    },
    verified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: [true]
    },
    sent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donation',
    }],
    received: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donation',
    }]
}, { timeStamps: true });

const NGO = mongoose.model('NGO', ngoSchema);
module.exports = NGO;