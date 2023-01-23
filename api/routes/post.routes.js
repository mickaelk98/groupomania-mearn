const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post.controller");
const likeCtrl = require("../controllers/like.controller");
const commentCtrl = require("../controllers/comment.controller");
const auth = require("../middleware/auth");
const multer = require("../config/multer.config");

//* route pour creer un post
router.post("/", auth, multer, postCtrl.createPost);

//* routes pour recuperer tout les posts
router.get("/", auth, postCtrl.getAllPosts);

//* route pour mettre a jour un post
router.put("/:id", auth, multer, postCtrl.updatePost);

//* route pour supprimer un post
router.delete("/:id", auth, postCtrl.deletePost);

//* route like et dislike un post
router.post("/like/:id", auth, likeCtrl.likePost);

//* route pour ajouter un commentaire
router.post("/comment/:id", auth, commentCtrl.commentPost);

module.exports = router;
