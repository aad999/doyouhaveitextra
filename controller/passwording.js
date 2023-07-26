const bcrypt = require('bcrypt');

const saltRounds = 10;

const encrypt = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error('Password encryption failed.');
    }
};

const match = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        throw new Error('Password comparison failed.');
    }
};

module.exports = {
    encrypt,
    match,
};