const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controller");
const auth = require("../middleware/auth");
const multer = require("../config/multer.config");

//* route pour recuperer tout les utilisateur
router.get("/all", userCtrl.getAllUsers);

//* route pour recuperer l'utilisateur qui fait la requete
router.get("/", auth, userCtrl.getCurrentUser);

//* route pour supprimer un utilisateuur
router.delete("/:id", auth, userCtrl.deleteCurrentUser);

//* route pour modifier un utilisateur
router.put("/:id", auth, multer, userCtrl.updateCurrentUser);

module.exports = router;
