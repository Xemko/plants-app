const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PlantSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    waterFrequency: {
        type: Number,
    },
    lastWatered: {
        type: Date,
    },
    nextWatering: {
        type: Date,
    },
    userId: {
        type: String,
        required: true,
    },
})

const Plant = model('Plant', PlantSchema);
module.exports = Plant;