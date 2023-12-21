const Plant = require('../models/Plant');

const createPlant = async (plantData) => {
    const {name, waterFrequency, lastWatered, nextWatering, userId} = plantData;
    const plant = new Plant({name, waterFrequency, lastWatered, nextWatering, userId});
    await plant.save();
    return plant;
}
const getPlants = async () => {
    return await Plant.find();
}

module.exports = {
    createPlant,
    getPlants
}