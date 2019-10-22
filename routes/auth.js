const express = require('express');
const router = express.Router();
const authController = require('./controllers/authController');

router.post('/facebook', authController.facebookAuth);

module.exports = router;
