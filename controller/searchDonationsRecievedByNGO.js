const Donation = require('../models/Donation');
const NGO = require('../models/NGO');

exports.searchDonationsRecievedByNGO = async (req, res) => {
    try {
        const { id } = req.query; // Extract the 'id' parameter from the query string
        const ngo = await NGO.findById(id);
        if (!ngo) {
            return res.status(404).json({ error: 'NGO not found' });
        }

        const arr = [];
        for (const donationId of ngo.received) {
            try {
                const donation = await Donation.findById(donationId);
                if (donation) {
                    arr.push(donation);
                } else {
                    console.log(`Donation with ID ${donationId} not found.`);
                }
            } catch (error) {
                console.error(`Error fetching donation with ID ${donationId}:`, error.message);
            }
        }

        res.json(arr);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
