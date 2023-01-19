const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controller");

//* route pour recuperer tout les utilisateur
router.get("/all", userCtrl.getAllUsers);

module.exports = router;
