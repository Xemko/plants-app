const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String, unique: true, required: true,
    },
    phoneNumber: {
        type: String, unique: true, required: true,
    }})

const User = model('User', UserSchema);

module.exports = User;