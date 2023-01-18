const User = require("../models/Users");
const bcrypt = require("bcrypt");

// controller d'inscription
exports.signup = async (req, res) => {
  try {
    const { password } = req.body;
    let hashedPassword = "";

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    } else {
      res.status(404).json({ password: "Le mot de passe est obligatoire" });
    }

    // creation d'un nouvelle utilisateur
    const user = new User({
      ...req.body,
      password: hashedPassword,
      //* ajout d'une image et d'un status par default
      image: `${req.protocol}://${req.get("host")}/images/default.jpg`,
      isAdmin: false,
      description: "",
    });

    // ajout de l'utilisateur dans la base de donnée
    await user.save();

    // si la l'inscription s'est bien passé
    res.status(201).json({ message: "votre compte a été crée" });
  } catch (e) {
    let errors = { userName: "", email: "", password: "" };

    // traitement des erreurs
    if (e.message.includes("User validation failed")) {
      Object.values(e.errors).map((err) => (errors[err.path] = err.message));
    }

    res.status(404).json(errors);
  }
};
