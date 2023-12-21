const User = require('../models/User');

const findUserByPhoneNumber = async (phoneNumber) => {
    return await User.findOne({ phoneNumber });
}


const registerUser = async (userData) => {
    const { phoneNumber } = userData;
    const existingUser = await findUserByPhoneNumber(phoneNumber);
    if (existingUser) {
        throw new Error('User already exists');
    }
    return await User.create(userData);
}

module.exports = {
    findUserByPhoneNumber,
    registerUser
}