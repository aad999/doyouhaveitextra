const Admin = require("../models/Admin");
const passwording = require("./passwording");

exports.addAdmin = async (req, res) => {
    const { name, password } = req.body;

    try {
        // Check if there are any admins in the database
        const adminCount = await Admin.countDocuments();
        if (adminCount > 0) {
            return res.status(409).json({
                success: false,
                message: "Admin already exists",
            });
        }

        // If there are no admins in the database, proceed to create a new admin
        const encrypted = await passwording.encrypt(password);
        const admin = new Admin({
            name: name,
            password: encrypted,
        });
        await admin.save();

        res.status(201).json({
            success: true,
            admin: { ...admin._doc, password: '' }, // Remove password from the response
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Something went wrong",
            err,
        });
    }
};

exports.loginAdmin = async (req, res) => {
    const { name, password } = req.body;
    const admin = await Admin.findOne({ name });
    if (!admin) {
        return res.status(404).json({
            success: false,
            message: 'Admin not found',
        });
    }
    const isPasswordMatch = await passwording.match(password, admin.password);
    if (!isPasswordMatch) {
        return res.status(401).json({
            success: false,
            message: 'Invalid credentials',
        });
    }
    res.status(200).json({
        success: true,
        admin: { ...admin, password: '' },
    });
};