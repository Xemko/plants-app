const express = require('express');
const router = express.Router();
const plantController = require('../../controllers/plantController');

router.get('/', plantController.getPlants);

router.get('/:plantId', plantController.getOnePlant);

router.post('/', plantController.createNewPlant);

router.put('/:plantId', plantController.updateOnePlant);

router.delete('/:plantId', plantController.deleteOnePlant);

module.exports = router;