const Plant = require('../models/Plant');

const createPlant = async (plantData) => {
    const {name, waterFrequency, lastWatered, nextWatering, userId} = plantData;
    const plant = new Plant({name, waterFrequency, lastWatered, nextWatering, userId});
    await plant.save();
    return plant;
}

const getPlantsByUserId = async (userId) => {
    return await Plant.find({userId});
}
const updatePlantById = async (plantId, plantData) => {
    return await Plant.findByIdAndUpdate(plantId, plantData, {new: true});
}
const deletePlantById = async (plantId) => {
    return await Plant.findByIdAndDelete(plantId); 
}

module.exports = {
    createPlant,
    getPlantsByUserId,
    updatePlantById,  
    deletePlantById
}