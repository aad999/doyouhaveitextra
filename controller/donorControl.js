const Donor = require("../models/Donor");
const passwording = require("./passwording");

exports.addDonor = async (req, res) => {
    const { name, emailId, phoneNum, password } = req.body;
    const prev = await Donor.findOne({emailId});
    if(prev) {
        return res.status(409).json({
            success: false,
            message: "User already exists",
            prev: {...prev, password: ''},
        });
    }
    const encrypted = await passwording.encrypt(password);
    const donor = new Donor({
        name: name,
        emailId: emailId,
        phoneNum: phoneNum,
        password: encrypted,
        donations: [],
    });
    await donor.save();
    try {
        res.status(201).json({
            success: true,
            donor: {...donor, password: ''},
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

exports.loginDonor = async (req, res) => {
    const { emailId, password } = req.body;
    const donor = await Donor.findOne({ emailId: emailId });
    if (!donor) {
        return res.status(404).json({
            success: false,
            message: 'User not found',
        });
    }
    const isPasswordMatch = await passwording.match(password, donor.password);
    if (!isPasswordMatch) {
        return res.status(401).json({
            success: false,
            message: 'Invalid credentials',
        });
    }
    res.status(200).json({
        success: true,
        donor: {...donor, password: ''},
    });
};