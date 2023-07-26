const Donation = require('../models/Donation');
const Donor = require('../models/Donor');

exports.searchDonationsByQuery = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            const donations = await Donation.find().populate('donor', 'name email'); // Populate the 'donor' field with specific fields from the Donor model;
            res.json(donations);
        }
        else{
            const donations = await Donation.find({
                $or: [
                    { heading: { $regex: query, $options: 'i' } },
                    { description: { $regex: query, $options: 'i' } },
                    { tag: { $regex: query, $options: 'i' } },
                ],
            }).populate('donor', 'name email'); // Populate the 'donor' field with specific fields from the Donor model
            res.json(donations);
        }
    } catch (error) {
        console.error('Error fetching donations:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}