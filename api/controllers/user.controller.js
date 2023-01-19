const User = require("../models/Users");

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
