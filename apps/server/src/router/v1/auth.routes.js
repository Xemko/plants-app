const express = require('express');
const router = express.Router();
const {auth, signIn, registerUser, protected} = require('../../controllers/auth.controller')

router.post('sign-in', signIn);
router.post('register', registerUser);
router.get('validate', auth, protected)


module.exports = router;