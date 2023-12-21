const { User, mapToPublicUser} = require('../models/User');


const findUserByPhoneNumber = async (phoneNumber) => {
    return mapToPublicUser(await User.findOne({ phoneNumber }));
}


const registerUser = async (userData) => {
    const {name, email, phoneNumber} = userData;
    const user = new User({name, email, phoneNumber});
    await user.save();
    return user;
}

module.exports = {
    findUserByPhoneNumber,
    registerUser
}