const Donation = require("../models/Donation");

exports.searchDonationById = async (req, res) => {
    try {
        const { id } = req.query; // Extract the 'id' parameter from the query string
        const donation = await Donation.findById(id);
        if (!donation) {
            return res.status(404).json({ error: 'Donation not found' });
        }
        res.json(donation);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}