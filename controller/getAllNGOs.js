// getAllNGOs.js

const NGO = require("../models/NGO");

exports.getAllNGOs = async (req, res) => {
    try {
        const ngos = await NGO.find();
        res.status(200).json({
            success: true,
            ngos,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch NGOs",
            error: err.message,
        });
    }
};
