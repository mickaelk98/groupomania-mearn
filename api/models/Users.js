const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { isEmail } = require("validator");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Le nom est obligatoire"],
      maxlength: [50, "Ce champ doit faire moin de 50 caractères"],
    },
    email: {
      type: String,
      required: [true, "L'email est obligatoire"],
      unique: [true],
      validate: [
        isEmail,
        "L'adresse que vous avez rentrez ne correspond pas a un format d'email",
      ],
    },
    password: {
      type: String,
      required: [true, "Le mot de passe est obligatoire"],
      minlength: [8, "Votre mot de passe doit faire au moin 8 caractères"],
    },
    description: {
      type: String,
      maxlength: [
        1000,
        "Votre description ne doit pas depasser 1000 caractères",
      ],
    },
    image: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator, { message: "Cet email est déja prise" });

module.exports = mongoose.model("User", userSchema);
