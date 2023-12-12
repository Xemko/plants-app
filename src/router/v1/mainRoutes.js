const express = require('express');
const router = express.Router();
const mainController = require('../../controllers/mainController');

router.get('/sign-in', mainController.signIn);

router.get('/auth', mainController.auth);

module.exports = router;