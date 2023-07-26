const NGO = require("../models/NGO");

exports.searchNGOById = async (req, res) => {
    try {
        const { id } = req.query; // Extract the 'id' parameter from the query string
        const ngo = await NGO.findById(id);
        if (!ngo) {
            return res.status(404).json({ error: 'NGO not found' });
        }
        res.json(ngo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}