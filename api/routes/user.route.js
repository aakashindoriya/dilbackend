const express = require('express');
const { registerUser, loginUser } = require('../controllers/user.controller');
const validateUser = require('../middlewares/validation.middleware');
const router = express.Router();


router.post('/register',validateUser, registerUser);


router.post('/login', loginUser);

module.exports = router;