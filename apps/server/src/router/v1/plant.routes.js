const express = require('express');
const router = express.Router();
const {getPlant, createPlant} = require('../../controllers/plant.controller');

router.get('/', getPlant);

router.get('/:plantId', getPlant);

router.post('/', createPlant);

//router.put('/:plantId', plantController.updateOnePlant);

// router.delete('/:plantId', plantController.deleteOnePlant);

module.exports = router;