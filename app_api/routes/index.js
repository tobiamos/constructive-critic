const express = require('express');
const router = express.Router();
const ctrlAuth = require('../controllers/auth');



router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

router.get('/checkemail/:email', ctrlAuth.checkEmail);
router.get('/checkusername/:username', ctrlAuth.checkUsername);


router.use(ctrlAuth.headers);

router.get('/profile', ctrlAuth.profile);

module.exports = router;