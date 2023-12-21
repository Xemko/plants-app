
const jwt = require('jsonwebtoken');
const authService = require('../services/auth.service');
const { log } = require('console');

const signIn = async (req, res) => {
    const { phoneNumber } = req.body;
    console.log(phoneNumber);
    if (!phoneNumber) {
       return res.status(400).json({code: 400, message: "Phone number is required"});
    }
    try {
        const user = await authService.findUserByPhoneNumber(phoneNumber);
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

const registerUser = async (req, res) => {
    const existingUser = await authService.findUserByPhoneNumber(req.body);
    if (existingUser) {
        return res.status(409).json({ code: 409, message: 'User already exists' });
    }
    try {
        const user = await authService.registerUser(req.body);
        const token = jwt.sign({ _id: user._id }, process.env.JWT_PRIVATE_KEY);
        console.log(user);
        return res.header('x-auth-token', token).send(user);
    } catch (err) {
        return res.status(500).json({ code: 500, message: 'Internal server error' });
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
    auth,
    registerUser
}