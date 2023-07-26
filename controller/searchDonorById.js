const Donor = require("../models/Donor");

exports.searchDonorById = async (req, res) => {
    try {
        const { id } = req.query; // Extract the 'id' parameter from the query string
        const donor = await Donor.findById(id);
        if (!donor) {
            return res.status(404).json({ error: 'Donor not found' });
        }
        res.json(donor);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}