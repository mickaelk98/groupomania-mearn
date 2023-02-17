const User = require("../models/Users");
const fs = require("fs");
const bcrypt = require("bcrypt");

// controller pour recuperer tout les utilisateur
exports.getAllUsers = async (req, res) => {
  try {
    // recherche tout les utilisateur
    const users = await User.find();

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
    // recherche de l'utilisateur dans la base de donnée
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
    console.log(e);
    res.status(404).json(e);
  }
};

// controller pour modifier un utilisateur
exports.updateCurrentUser = async (req, res) => {
  try {
    const { password, email, userName, description } = req.body;
    const { id: userId } = req.params;
    let userObject = {};

    // recherche de l'utilisateur dans la base de donnée
    const user = await User.findOne({ _id: userId });

    if (!user) {
      res.status(404).json({ message: "L'utilisateur n'existe pas" });
    } else {
      // verifie si celui qui fait la requte est celui qui a crée le profil
      if (userId !== req.auth) {
        res.status(401).json({ message: "Requete non autorisé" });
      } else {
        //recherche si l'email est déja utiisé
        const userAlreadyExist = await User.findOne({ email: email });

        if (!userAlreadyExist) {
          userObject.email = email;
        } else if (userAlreadyExist.email === user.email) {
          userObject.email = user.email;
        } else {
          return res.status(404).json({ email: "L'émail est déja utilisé" });
        }

        // si l'on modifie le mot de passe
        if (password === "") {
          userObject.password = user.password;
        } else {
          const hashedPassword = await bcrypt.hash(password, 10);
          userObject.password = hashedPassword;
        }

        // si l'on modifie l'image
        if (req.file) {
          // recuperation du nom de l'image
          const filename = user.image.split("/images/")[1];

          // ajout de la nouvelle image
          userObject.image = `${req.protocol}://${process.env.HOSTNAME}/images/${req.file.filename}`;

          // suppression de l'ancienne image
          fs.unlink(`images/${filename}`, () => {
            updateAndSendNewUser();
          });
        } else {
          //garde l'ancienne image
          userObject.image = user.image;
          updateAndSendNewUser();
        }
      }

      // fonction qui met a jour et renvoie l'utilisateur
      async function updateAndSendNewUser() {
        userObject.userName = userName;
        userObject.description = description;
        // sauvegarde du nouvelle utilisateur
        await User.updateOne({ _id: userId }, { ...userObject, _id: userId });

        // recheche et renvoi de l'utilisateur une fois modifié
        const newUser = await User.findOne({ _id: userId });
        res.status(201).json(newUser);
      }
    }
  } catch (e) {
    res.status(500).json(e);
  }
};
