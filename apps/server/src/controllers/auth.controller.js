
const jwt = require('jsonwebtoken');
const mainService = require('../services/auth.service');

const signIn = async (req, res) => {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
       return res.status(400).json({code: 400, message: "Phone number is required"});
    }
    try {
        const user = await mainService.findUserByPhoneNumber(phoneNumber);
        if (!user) {
          return res.status(404).json({code: 404, message: "User not found"});
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_PRIVATE_KEY);
         return res.header('x-auth-token', token).send(user);
    }
    catch (err) {
        return res.status(500).json({code: 500, message: "Internal server error"});
    }
    
}

const auth = async (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ code: 401, message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        req.user = decoded;
        next();
    } catch (ex) {
        return res.status(400).json({ code: 400, message: 'Invalid token.' });
    }
}

module.exports = {
    signIn,
    auth
}