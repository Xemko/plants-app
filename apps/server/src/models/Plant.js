const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PlantSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    waterFrequency: {
        type: Number,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    lastWatered: {
        type: Date,
    },
    nextWatering: {
        type: Date,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
        type: String,
    },
    image: {
        type: String,
    },
    room: {
        type: String,
        default: "Living Room",
    },
    status: {
        type: Number,
    },

});

// PlantSchema.pre('save', function(next) {
//     if (this.waterFrequency) {
//         const nextWateringDate = new Date(this.lastWatered);
//         nextWateringDate.setDate(nextWateringDate.getDate() + this.waterFrequency);
//         this.nextWatering = nextWateringDate;
//     }
//     next();
// });

const Plant = model("Plant", PlantSchema);
module.exports = Plant;
