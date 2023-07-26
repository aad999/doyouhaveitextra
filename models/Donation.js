const mongoose = require("mongoose");
const Donor = require("./Donor");
const NGO = require("./NGO");

const donationSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: [true]
    },
    description: {
        type: String,
        required: [true]
    },
    tag: {
        type: String,
        required: [true]
    },
    date: {
        type: Date,
        required: [true]
    },
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donor',
        required: true,
    },
    received: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NGO',
    }],
    sent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NGO',
    }]
}, { timeStamps: true });

const Donation = mongoose.model('Donation', donationSchema);
module.exports = Donation;