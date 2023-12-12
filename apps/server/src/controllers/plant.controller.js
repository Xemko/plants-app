const plantService = require('../services/plantService');

const getPlants = async (req, res) => {
    const plants = await plantService.getPlants();
    res.send(plants);
}

module.exports = {
    getPlants
}