const Post = require("../models/Posts");
const User = require("../models/Users");

exports.commentPost = async (req, res) => {
  try {
    // recuperation de l'id du post
    const { id } = req.params;

    // recherche le post que l'on veut commenter
    const post = await Post.findOne({ _id: id });

    // recherche de l'utilisateur qui veut commenter dans la base de donnée
    const user = await User.findOne({ _id: req.auth });

    console.log(user, req.body.text);

    if (post) {
      // ajout du commentaire dans le post
      await Post.updateOne(
        { _id: id },
        {
          $push: {
            comments: {
              commenterId: user._id,
              commenterUsername: user.userName,
              commenterImage: user.image,
              text: req.body.text,
              timestamp: new Date().getTime(),
            },
          },
        }
      );

      // recherche du nouveaux post dans la base de donnée
      const newPost = await Post.findOne({ _id: id });
      res.status(201).json(newPost);
    } else {
      res.status(404).json({
        message: "Le post que vous voulez commenter n'a paas été trouvé",
      });
    }
  } catch (e) {
    res.status(500).json({ message: "Impossible de commenter le post", e });
  }
};
