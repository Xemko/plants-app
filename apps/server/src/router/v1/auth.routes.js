const express = require('express');
const router = express.Router();
const {auth, signIn, registerUser} = require('../../controllers/auth.controller')

router.post('/sign-in', signIn);
router.post('/register', registerUser);
router.get('/auth', auth);

router.get('/protected', auth)


module.exports = router;