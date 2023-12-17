const User = require('../models/User');

const findUserByPhoneNumber = async (phoneNumber) => {
    return await User.findOne({ phoneNumber });
}

module.exports = {
    findUserByPhoneNumber
}