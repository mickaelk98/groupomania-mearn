const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// controller d'inscription
exports.signup = async (req, res) => {
  try {
    const { password, email } = req.body;
    let hashedPassword = "";
    let userStatus;

    // verifie si l'identifiant et le mot de passe sont ceux de l'administrateur
    if (
      email === process.env.ADMIN_USERNAM &&
      password === process.env.ADMIN_PASSWORD
    ) {
      userStatus = true;
    } else {
      userStatus = false;
    }

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
      image: `${req.protocol}://${process.env.HOSTNAME}/images/default.jpg`,
      isAdmin: userStatus,
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

// controller de connexion
exports.login = async (req, res) => {
  const { password } = req.body;

  // recherche l'utilisateur dans la base de donnée
  const user = await User.findOne({ email: req.body.email });

  // si l'utilisateur n'existe pas
  if (!user) {
    return res.status(401).json({ email: "Cet utilisateur n'existe pas" });
  } else {
    const validPassword = await bcrypt.compare(password, user.password);

    // si le mot de passe de la requete ne correspond pas a celui dans la base de donnée
    if (!validPassword) {
      return res.status(401).json({ password: "Mot de passe incorect" });
    } else {
      const token = jwt.sign({}, process.env.JWT_KEY, {
        subject: user._id.toString(),
        // validité du token (7 jours)
        expiresIn: 3600 * 24 * 7,
      });

      // renvoi l'utilisateur et un token pour identifier chaque requete
      res.cookie("token", token);
      res.status(200).json({
        _id: user._id,
        userName: user.userName,
        email: user.email,
        image: user.image,
        description: user.description,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    }
  }
};

// controller de connexion
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "cookie supprimé" });
};
