const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    name: String,
    email: String,
    phoneNumber: String
})

const User = model('User', UserSchema);

module.exports = User;