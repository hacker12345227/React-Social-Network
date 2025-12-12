const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// Gebruikersregistratie
router.post('/register', registerUser);

// Gebruikerslogin
router.post('/login', loginUser);

module.exports = router;
