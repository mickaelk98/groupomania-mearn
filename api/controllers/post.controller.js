const Post = require("../models/Posts");
const User = require("../models/Users");
const fs = require("fs");

// controller pour créer un post
exports.createPost = async (req, res) => {
  try {
    // recuperation de données de la requete
    const { text } = req.body;

    // recherche de la personne qui fait le post dans la base de donnée
    const user = await User.findById({ _id: req.auth });

    // recuperation des information de l'utilisateur qui fait le post
    const { _id, userName, image } = user;

    // verifie que le post contient un post ou une image
    if (!text && !req.file) {
      res.status(400).json({
        message:
          "Pour créer un post vous devez envoyer un message ou une image",
      });
    }

    // verifie si le post contient un text ou une image
    const postObject = req.file
      ? {
          posterId: _id,
          posterUsername: userName,
          posterImage: image,
          text,
          image: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        }
      : {
          posterId: _id,
          posterUsername: userName,
          posterImage: image,
          text,
        };

    // sauvegarde du post dans la base de donnée
    const post = new Post(postObject);
    const newPost = await post.save();

    res.status(201).json(newPost);
  } catch (e) {
    res.status(500).json({ message: "Le post n'a pas pu etre crée", e });
  }
};

// controller pour recuperer tout les posts
exports.getAllPosts = async (req, res) => {
  try {
    // recuperation des post dans la base de données
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json({ message: "Le post n'a pas pu etre crée", e });
  }
};

// controller pour mettre a jour un post
exports.updatePost = async (req, res) => {
  try {
    // recuperation des données
    const { text } = req.body;
    let postObject = {};

    // recuperation de l'id du post
    const { id } = req.params;

    // recherche le post que l'on veut modifié dans la base de donnée
    const post = await Post.findOne({ _id: id });

    // si le post a été trouvé
    if (post) {
      // verifie si celui qui veut supprimer le post a les droits
      if (req.auth !== post.posterId) {
        return res.status(401).json({ message: "Requete non autorisé" });
      }

      // verifie que la requete n'est pas vide
      if (!text && !req.file) {
        res.status(401).json({
          message:
            "Vous devez envoyer un text ou une image pour modifier le post",
        });
      }

      // si l'on modifie le text
      if (text) {
        postObject.text = text;
      } else {
        postObject.text = post.text;
      }

      // si l'on modifie l'image
      if (req.file) {
        // recuperation du nom de l'image de l'ancien post si il y en avait un
        const filename = post.image ? post.image.split("/images/")[1] : "";

        // ajout de la nouvelle image
        postObject.image = `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`;

        post.image
          ? fs.unlink(`images/${filename}`, () => {
              updateAndSendNewPost();
            })
          : updateAndSendNewPost();
      } else {
        //garde l'ancienne image
        postObject.image = post.image;
        updateAndSendNewPost();
      }
    } else {
      res
        .status(404)
        .json({ message: "Le post que vous voulez modifié na pas été trouvé" });
    }

    // fonction qui met a jour et renvoie le nouveau post
    async function updateAndSendNewPost() {
      // sauvegarde du nouvelle utilisateur
      await Post.updateOne({ _id: id }, { ...postObject, _id: id });

      // recheche et renvoi de l'utilisateur une fois modifié
      const newPost = await Post.findOne({ _id: id });
      res.status(201).json(newPost);
    }
  } catch (e) {
    res.status(500).json({ message: "le post na pas pu etre modifié", e });
  }
};

// controller pour supprimer un post
exports.deletePost = async (req, res) => {
  try {
    // recuperation de l'id du post
    const { id } = req.params;

    // recherche le post que l'on veut modifié dans la base de donnée
    const post = await Post.findOne({ _id: id });

    // si le post a été trouvé
    if (post) {
      // verifie si celui qui veut supprimer le post a les droits
      if (req.auth !== post.posterId) {
        return res.status(401).json({ message: "Requete non autorisé" });
      }

      // si le post que l'on veut supprimer avait une image
      if (post.image) {
        // recuperation du nom de l'image
        const filename = post.image.split("/images/")[1];

        fs.unlink(`images/${filename}`, async () => {
          // suppression du post
          await Post.deleteOne({ _id: id });
          res.status(200).json({ message: "le post a été supprimé" });
        });
      }
      // suppression du post
      await Post.deleteOne({ _id: id });
      res.status(200).json({ message: "le post a été supprimé" });
    } else {
      res
        .status(404)
        .json({ message: "Le post que vous voulez modifié na pas été trouvé" });
    }
  } catch (e) {
    res.status(500).json({ message: "le post na pas pu etre supprimé", e });
  }
};
