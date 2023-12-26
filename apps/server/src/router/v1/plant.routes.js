const express = require('express');
const router = express.Router();
const {getPlant, createPlant, getPlantsByUserId, updatePlantById, deletePlantById} = require('../../controllers/plant.controller');
const { auth } = require('../../controllers/auth.controller');

//router.get('/', getPlant); //work in progress, for test

// get all plants of specific user by his ID
router.get('/', auth, getPlantsByUserId) ;
// create a plant
router.post('/', auth, createPlant);
// update a plant
router.put('/:plantId',auth, updatePlantById);
// delete a plant
router.delete('/:plantId',auth, deletePlantById);

module.exports = router;