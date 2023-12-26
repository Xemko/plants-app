const express = require('express');
const router = express.Router();
const {getPlant, createPlant, getPlantsByUserId, updatePlantById, deletePlantById} = require('../../controllers/plant.controller');


router.get('/', getPlant); //work in progress, for test

// get all plants of specific user by his ID
router.get('/:userId', getPlantsByUserId) ;
// create a plant
router.post('/', createPlant);
// update a plant
router.put('/:plantId', updatePlantById);
// delete a plant
router.delete('/:plantId', deletePlantById);

module.exports = router;