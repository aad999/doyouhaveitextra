const NGO = require('../models/NGO');
const Donation = require('../models/Donation');

exports.submitRequest = async (req, res) => {
    try {
        const { ngoId, donationId } = req.body;

        const ngo = await NGO.findById(ngoId);
        if (ngo.sent.includes(donationId)) {
            return res.status(400).json({ error: 'Request already submitted by this NGO' });
        }

        const donation = await Donation.findById(donationId);
        if (donation.received.includes(ngoId)) {
            return res.status(400).json({ error: 'Request already received by this NGO' });
        }

        await NGO.findByIdAndUpdate(
            ngoId,
            { $push: { sent: donationId } },
            { new: true }
        );
        

        await Donation.findByIdAndUpdate(
            donationId,
            { $push: { received: ngoId } },
            { new: true }
        );

        res.json({ message: 'Request submitted successfully' });
    } catch (error) {
        console.error('Error submitting request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};