const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth.controller");

//* route pour s'inscrire
router.post("/signup", authCtrl.signup);

//* route pour se connecter
router.post("/login", authCtrl.login);

//* route pour se deconnecter
router.post("/logout", authCtrl.logout);

module.exports = router;
