const Post = require("../models/Posts");
const User = require("../models/Users");

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
