const User = require("../models/Users");
const fs = require("fs");

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

//controller pour supprimer un utilisateur
exports.deleteCurrentUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
      res.status(404).json({ message: "L'utilisateur n'existe pas" });
    } else {
      // verifie si celui qui fait la requte est celui qui a crée le profil
      if (req.params.id !== req.auth) {
        res.status(401).json({ message: "Requete non autorisé" });
      } else {
        // recuperation du nom de l'image
        const filename = user.image.split("/images/")[1];

        // si l'utilisateur a l'mage par defaut, supprime seulement l'utilisateur
        if (filename === "default.jpg") {
          await User.deleteOne({ _id: req.params.id });
          res.status(200).json({ message: "Utilisateur supprimé" });
        }
        // sinon supprime tout
        else {
          fs.unlink(`images/${filename}`, async () => {
            await User.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: "Utilisateur supprimé" });
          });
        }
      }
    }
  } catch (e) {
    // console.log(e);
    res.status(404).json(e);
  }
};
