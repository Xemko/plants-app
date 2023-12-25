const express = require('express');
const router = express.Router();
const {getPlant, createPlant, getPlantsByUserId} = require('../../controllers/plant.controller');
const { get } = require('http');


router.get('/', getPlant); //work in progress, for test

// get all plants of specific user
router.get('/:userId', getPlantsByUserId) ;
// create a plant
router.post('/', createPlant);

//router.put('/:plantId', plantController.updateOnePlant);

// router.delete('/:plantId', plantController.deleteOnePlant);

module.exports = router;