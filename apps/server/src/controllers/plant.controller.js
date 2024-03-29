const plantService = require('../services/plant.service');

const getPlant = async (req, res) => {
    try {
        const userId = req.params.userId;
        const plants = await plantService.getPlantsByUserId(userId);
        return res.status(200).json({code: 200, message: 'Success', plants});
    } catch (err) {
        return res.status(500).json({code: 500, message: 'Internal server error'});
    }
}

const getPlantsByUserId = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log(userId);
        const plants = await plantService.getPlantsByUserId(userId);
        return res.status(200).json({code: 200, message: 'Success', plants});
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

const updatePlantById = async (req, res) => {
    try {
        const plantId = req.params.plantId;
        const plantData = req.body;

        const plant = await plantService.updatePlantById(plantId, plantData);

        return res.status(200).json({code: 200, message: 'Success', plant});

    } catch (err) {
        return res.status(500).json({code: 500, message: 'Internal server error'});
    }
}

const deletePlantById = async (req, res) => {
    try {
        const plantId = req.params.plantId;
        const plant = await plantService.deletePlantById(plantId);
        return res.status(200).json({code: 200, message: 'Success', plant});
    } catch (err) {
        return res.status(500).json({code: 500, message: 'Internal server error'});
    }
}

const getPlantById = async (req, res) => {
    try {
        const plantId = req.params.plantId;
        const plant = await plantService.getPlantById(plantId);
        return res.status(200).json({code: 200, message: 'Success', plant});
    } catch (err) {
        return res.status(500).json({code: 500, message: 'Internal server error'});
    }

}

module.exports = {
    getPlant,
    createPlant,
    getPlantsByUserId,
    updatePlantById,
    deletePlantById, 
    getPlantById
}