require("dotenv").config();
const express = require("express");
const cookie = require("cookie-parser");
require("./config/db.config");
const path = require("path");

const app = express();
const port = 5000;

//* declaration des routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//* intercepte les coockies
app.use(cookie());

//* intercepte les requete json
app.use(express.json());

//* permet de servir des images
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

app.listen(port, () => {
  console.log("Serveur lancé sur le port: " + port);
});
