const NGO = require('../models/NGO');
const Donation = require('../models/Donation');

exports.acceptRequest = async (req, res) => {
    try {
        const { ngoId, donationId } = req.body;

        // Check if NGO exists
        const ngo = await NGO.findById(ngoId);
        if (!ngo) {
            return res.status(404).json({ error: 'NGO not found' });
        }

        // Check if donation exists
        const donation = await Donation.findById(donationId);
        if (!donation) {
            return res.status(404).json({ error: 'Donation not found' });
        }

        if (ngo.received.includes(donationId)) {
            return res.status(400).json({ error: 'Request already accepted by this NGO' });
        }

        if (donation.sent.includes(ngoId)) {
            return res.status(400).json({ error: 'Request already accepted by this donor' });
        }

        // Update NGO document
        await NGO.findOneAndUpdate(
            { _id: ngoId },
            {
                $pull: { sent: donationId },
                $push: { received: donationId }
            },
            { new: true }
        );

        // Update Donation document
        await Donation.findOneAndUpdate(
            { _id: donationId },
            {
                $pull: { received: ngoId },
                $push: { sent: ngoId }
            },
            { new: true }
        );

        res.json({ message: 'Request submitted successfully' });

    } catch (error) {
        console.error('Error submitting request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
