const Plant = require('../models/Plant');

const createPlant = async (plantData) => {
    const {name, waterFrequency, lastWatered, nextWatering, userId} = plantData;
    const plant = new Plant({name, waterFrequency, lastWatered, nextWatering, userId});
    await plant.save();
    return plant;
}

const getPlant = async (plantName) => {
    return await Plant.findOne({name: plantName});
}
const getPlantsByUserId = async (userId) => {
    return await Plant.find({userId : userId});
}
module.exports = {
    createPlant,
    getPlant,
    getPlantsByUserId
}