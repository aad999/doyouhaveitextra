const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true]
    },
    password: {
        type: String,
        required: [true]
    },
}, { timeStamps: true });

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;