const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PlantSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "No description",
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
        default: Date.now,
    },
    nextWatering: [{
        type: Date,
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
        type: String,
        default : "placeholder"
    },
    room: {
        type: String,
        default: "Living Room",
    },
    status: {
        type: Number,
        default: 0,
    },
    snoozed: {
        type: Boolean,
        default: false,
    },

});

PlantSchema.pre('save', function(next) {
    if (this.waterFrequency) {
        const daysInWeek = 7;
        this.nextWatering = Array.from({length: this.waterFrequency}, (_, i) => {
        const nextWateringDate = new Date(this.lastWatered);
        nextWateringDate.setDate(nextWateringDate.getDate() + Math.ceil(daysInWeek / this.waterFrequency) * (i + 1));
        return nextWateringDate;
    });
}
    next();
});

const Plant = model("Plant", PlantSchema);
module.exports = Plant;
