const mongoose = require("mongoose");
const Donation = require("./Donation");

const donorSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: [true]
    },
    donations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donation',
    }]
}, { timeStamps: true });

const Donor = mongoose.model('Donor', donorSchema);
module.exports = Donor;