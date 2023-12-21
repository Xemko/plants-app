const plantService = require('../services/plant.service');

const getPlants = async (req, res) => {
    try {
        const plants = await plantService.getPlants();
        return res.status(200).json({code: 200, message: 'Success', data: plants});
    } catch (err) {
        return res.status(500).json({code: 500, message: 'Internal server error'});
    }
}

module.exports = {
    getPlants
}