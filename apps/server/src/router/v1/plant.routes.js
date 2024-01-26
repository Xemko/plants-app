const express = require('express');
const router = express.Router();
const {createPlant, getPlantsByUserId, updatePlantById, deletePlantById, getPlantById} = require('../../controllers/plant.controller');
const { auth } = require('../../controllers/auth.controller');

//router.get('/', getPlant); //work in progress, for test

// get all plants of specific user by his ID
router.get('/', auth, getPlantsByUserId) ;
// get a plant by its ID
router.get('/:plantId', auth, getPlantById);
// create a plant
router.post('/', auth, createPlant);
// update a plant
router.put('/:plantId',auth, updatePlantById);
// delete a plant
router.delete('/:plantId',auth, deletePlantById);


module.exports = router;