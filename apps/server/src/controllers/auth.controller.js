
const jwt = require('jsonwebtoken');
const authService = require('../services/auth.service');
const User = require('../models/User');


const registerUser = async (req, res) => {
    const userData = req.body;
    if (!userData) {
        return res.status(401).json({code: 401, message: "Please enter user data"});
    }
try {
    const user = await authService.registerUser(userData);
    if (!user) {
        return res.status(500).json({code: 500, message: "Registration has failed. Please try again"});
    }
    const authToken = jwt.sign({ id: user.id }, process.env.JWT_PRIVATE_KEY);
    return res.header('x-auth-token', authToken).json({code: 201, message: "User registered successfully", user});
} catch (error) {
    return res.status(500).json({code: 500, message: "Internal server error"});
}

}

const signIn = async (req, res) => {
    const { phoneNumber } = req.body;
    console.log(phoneNumber);
    if (!phoneNumber) {
       return res.status(401).json({code: 401, message: "Please enter a valid phone number"});
    }
    try {
        const user = await authService.findUserByPhoneNumber(phoneNumber);
        if (!user) {
          return res.status(404).json({code: 404, message: "Cannot find your account"});
        }
        const authToken = jwt.sign({ id: user._id }, process.env.JWT_PRIVATE_KEY);
         return res.header('x-auth-token', authToken).json({code: 200, message: "User logged in successfully", user});
    }
    catch (err) {
        return res.status(500).json({code: 500, message: "Internal server error", err});
    }
    
}


const auth = async (req, res, next) => {
    const authToken = req.header('x-auth-token');
    try {
        const decoded = jwt.verify(authToken, process.env.JWT_PRIVATE_KEY);
        req.user = decoded;
        next();
    } catch (ex) {
        return res.status(401).json({ code: 401, message: 'Invalid token.' });
    }
}
const protected = async (req, res) => {
    return res.json({ code: 200, message: 'Access granted. You are in protected route' });
}

module.exports = {
    signIn,
    auth,
    registerUser,
    protected
}