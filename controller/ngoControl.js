const NGO = require("../models/NGO");
const passwording = require("./passwording");

exports.addNGO = async (req, res) => {
    const { name, emailId, phoneNum, verificationDoc, password } = req.body;
    const prev = await NGO.findOne({ emailId });
    if (prev) {
        return res.status(409).json({
            success: false,
            message: "User already exists",
            prev: { ...prev, password: '' },
        });
    }
    const encrypted = await passwording.encrypt(password);
    const ngo = new NGO({
        name: name,
        emailId: emailId,
        phoneNum: phoneNum,
        verificationDoc: verificationDoc,
        password: encrypted,
        donations: [],
    });
    await ngo.save();
    try {
        res.status(201).json({
            success: true,
            ngo: { ...ngo, password: '' },
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Something went wrong",
            err,
        });
    }
}

exports.loginNGO = async (req, res) => {
    const { emailId, password } = req.body;
    const ngo = await NGO.findOne({ emailId: emailId });
    if (!ngo) {
        return res.status(404).json({
            success: false,
            message: 'User not found',
        });
    }
    const isPasswordMatch = await passwording.match(password, ngo.password);
    if (!isPasswordMatch) {
        return res.status(401).json({
            success: false,
            message: 'Invalid credentials',
        });
    }
    res.status(200).json({
        success: true,
        ngo: { ...ngo, password: '' },
    });
};

exports.verifyNGO = async (req, res) => {
    const { id } = req.query;

    try {
        // Find the NGO by ID
        const ngo = await NGO.findById(id);
        if (!ngo) {
            return res.status(404).json({
                success: false,
                message: 'NGO not found',
            });
        }

        // Check if the NGO is already verified
        if (ngo.verified) {
            return res.status(400).json({
                success: false,
                message: 'NGO is already verified',
            });
        }

        // Update the NGO to mark it as verified
        ngo.verified = true;
        await ngo.save();

        res.status(200).json({
            success: true,
            message: 'NGO verified successfully',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: err.message,
        });
    }
};

exports.cancelVerification = async (req, res) => {
    const { id } = req.query;

    try {
        // Find the NGO by ID
        const ngo = await NGO.findById(id);
        if (!ngo) {
            return res.status(404).json({
                success: false,
                message: 'NGO not found',
            });
        }

        // Check if the NGO is already not verified
        if (!ngo.verified) {
            return res.status(400).json({
                success: false,
                message: 'NGO is already not verified',
            });
        }

        // Update the NGO to mark it as not verified
        ngo.verified = false;
        await ngo.save();

        res.status(200).json({
            success: true,
            message: 'NGO verification cancelled successfully',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: err.message,
        });
    }
};