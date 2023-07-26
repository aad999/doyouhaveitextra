const Donation = require('../models/Donation');
const Donor = require('../models/Donor');
exports.addDonation = async (req, res) => {
    const { heading, description, tag, date, donor_id } = req.body;
    try {
        const donor = await Donor.findById(donor_id);
        if (!donor) {
            return res.status(404).json({
                success: false,
                message: 'Donor not found.',
            });
        }
        const newDonation = new Donation({
            heading: heading,
            description: description,
            tag: tag,
            date: date,
            donor: donor_id,
            ngos: [],
        });
        await newDonation.save();
        donor.donations.push(newDonation._id);
        await donor.save();
        res.status(201).json({
            success: true,
            donation: newDonation,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while adding the donation.',
            error: err.message,
        });
    }
};