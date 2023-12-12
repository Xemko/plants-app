const express = require('express');
const router = express.Router();
const mainController = require('../../controllers/main.controller');

router.post('/sign-in', mainController.signIn);

router.get('/auth', mainController.auth);

module.exports = router;