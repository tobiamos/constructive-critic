const express = require('express');
const router = express.Router();
const ctrlAuth = require('../controllers/auth');



router.post('/register', ctrlAuth.register);

module.exports = router;