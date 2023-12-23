const plantService = require('../services/plant.service');

const getPlants = async (req, res) => {
    try {
        const userId = req.user.id;
        // TODO getPlantsByUserId
        const plants = await plantService.getPlants(userId);
        return res.status(200).json({code: 200, message: 'Success', data: plants});
    } catch (err) {
        return res.status(500).json({code: 500, message: 'Internal server error'});
    }
}

const getPlantById = async (req, res) => {
    try {
        const plantId = req.params.id;
        const plant = await plantService.getPlantById(plantId);
        return res.status(200).json({code: 200, message: 'Success', data: plant});
    } catch (err) {
        return res.status(500).json({code: 500, message: 'Internal server error'});
    }
}
const createPlant = async (req, res) => {
    const plantData = req.body;
    if (!plantData) {
        return res.status(400).json({code: 400, message: "Please enter plant data"});
}
try {
    const plant = await plantService.createPlant(plantData);
    if (!plant) {
        return res.status(500).json({code: 500, message: "Plant creation has failed. Please try again"});
    }
    return res.status(201).json({code: 201, message: "Plant created successfully", plant});
} catch (error) {
    return res.status(500).json({code: 500, message: "Internal server error", error});
}
}

module.exports = {
    getPlants,
    createPlant
}