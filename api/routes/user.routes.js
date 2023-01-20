const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controller");
const auth = require("../middleware/auth");

//* route pour recuperer tout les utilisateur
router.get("/all", userCtrl.getAllUsers);

//* route pour recuperer l'utilisateur qui fait la requete
router.get("/", auth, userCtrl.getCurrentUser);

module.exports = router;
