const User = require("../models/Users");
const jwt = require("jsonwebtoken");

// controller pour recuperer tout les utilisateur
exports.getAllUsers = async (req, res) => {
  try {
    // recherche tout les utilisateur
    const users = await User.find();
    console.log(users);

    if (users.length === 0) {
      res.status(200).json({ message: "Aucun utilisateur pour le moment" });
    } else {
      res.status(200).json(users);
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "Les utilisateurs n'ont pas pu etre récuperé", e });
  }
};

// controller pour recuperer un utilisateur
exports.getCurrentUser = async (req, res) => {
  try {
    // recherche l'utilisateur dans la base de donnée
    const currentUser = await User.findById(req.auth).select("-password");

    if (currentUser) {
      res.status(200).json(currentUser);
    } else {
      res.status(404).json(null);
    }
  } catch (e) {
    res.status(404).json(null);
  }
};
