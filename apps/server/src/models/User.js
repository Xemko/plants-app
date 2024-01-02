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
    },
    avatar : {
        type: String,
        default : ""
    },
    })

const User = model('User', UserSchema);

// TODO move this to a proper file in the future
// const mapToPublicUser = (user) => {
//     const { _id, name, email, phoneNumber } = user;
//     return { id: _id, name, email, phoneNumber };
// }

module.exports = User