const plantService = require('../services/plant.service');

const getPlants = async (req, res) => {
    try {
        const plants = await plantService.getPlants();
        return res.status(200).json({code: 200, message: 'Success', data: plants});
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