const plantService = require('../services/plant.service');

const getPlants = async (req, res) => {
    const plants = await plantService.getPlants();
    res.send(plants);
}

module.exports = {
    getPlants
}