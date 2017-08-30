const express = require("express");
const router = express.Router();
const ctrlAuth = require("../controllers/auth");

router.get("/message/:username", ctrlAuth.message);
router.delete("/message/:username", ctrlAuth.deleteMessage);
router.post("/message/:id", ctrlAuth.sendMessage);
router.delete("/favourite/:username", ctrlAuth.favorite);
router.post("/register", ctrlAuth.register);
router.post("/login", ctrlAuth.login);

router.post("/changepersonalinfo", ctrlAuth.changePersonalInfo);
router.get("/checkemail/:email", ctrlAuth.checkEmail);
router.get("/checkusername/:username", ctrlAuth.checkUsername);

router.use(ctrlAuth.headers);

router.get("/profile", ctrlAuth.profile);

module.exports = router;
