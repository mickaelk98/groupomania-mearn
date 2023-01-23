const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post.controller");
const auth = require("../middleware/auth");
const multer = require("../config/multer.config");

//* route pour creer un post
router.post("/", auth, multer, postCtrl.createPost);

//* routes pour recuperer tout les posts
router.get("/", auth, postCtrl.getAllPosts);

module.exports = router;
