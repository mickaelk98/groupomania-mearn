const Post = require("../models/Posts");

// controller pour like et dislike un post
exports.likePost = async (req, res) => {
  try {
    // recuperation de l'id du post
    const { id } = req.params;

    // recherche le post que l'on veut like ou dislike
    const post = await Post.findOne({ _id: id });

    // si le post a été trouvé
    if (post) {
      //si l'utilisateur a déja liké le post
      if (post.usersLiked.includes(req.auth)) {
        await Post.updateOne({ _id: id }, { $pull: { usersLiked: req.auth } });
        const newPost = await Post.findOne({ _id: id });
        res.status(201).json(newPost);
      } else {
        await Post.updateOne({ _id: id }, { $push: { usersLiked: req.auth } });
        const newPost = await Post.findOne({ _id: id });
        res.status(201).json(newPost);
      }
    } else {
      return res.status(404).json({
        message: "le post que vous voulez like ou dislike n'a pas été trouvé",
      });
    }
  } catch (e) {
    res.statu(500).json({ message: "Impossile de like ou dislike le post", e });
  }
};
