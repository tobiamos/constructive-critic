const express = require('express');
const router = express.Router();
const ctrlAuth = require('../controllers/auth');



router.post('/register', ctrlAuth.register);

router.get('/checkemail/:email', ctrlAuth.checkEmail);
router.get('/checkusername/:username', ctrlAuth.checkUsername);

module.exports = router;