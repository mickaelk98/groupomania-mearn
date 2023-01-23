const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    posterId: {
      type: String,
      required: [true],
    },
    posterUsername: {
      type: String,
      required: true,
    },
    posterImage: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      maxlenght: [500, "Votre post ne doit pas depasser les 500 caractères"],
    },
    image: {
      type: String,
    },
    usersLiked: {
      type: [String],
      required: true,
    },
    comments: {
      type: [
        {
          commenterId: String,
          commenterUsername: String,
          commenterImage: String,
          text: String,
          timestamp: Number,
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
