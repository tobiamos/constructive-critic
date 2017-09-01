const express = require("express");
const router = express.Router();
const ctrlAuth = require("../controllers/auth");
var multer = require('multer');
var path = require('path');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
var upload = multer({ storage: storage });
router.get("/message/:username", ctrlAuth.message);
router.delete("/message/:username", ctrlAuth.deleteMessage);
router.post("/message/:id", ctrlAuth.sendMessage);
router.delete("/favourite/:username", ctrlAuth.favorite);
router.post("/register", ctrlAuth.register);
router.post("/login", ctrlAuth.login);
router.post("/uploadimage",upload.single('image'), ctrlAuth.uploadImage);
router.delete("/removeuser/:username", ctrlAuth.removeUser);
router.post("/changepersonalinfo", ctrlAuth.changePersonalInfo);
router.get("/checkemail/:email", ctrlAuth.checkEmail);
router.get("/checkusername/:username", ctrlAuth.checkUsername);
router.post("/changepassword", ctrlAuth.changePassword);
router.post("/forgotpassword", ctrlAuth.forgotPassword);

router.use(ctrlAuth.headers);

router.get("/profile", ctrlAuth.profile);

module.exports = router;
