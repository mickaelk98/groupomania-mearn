require("dotenv").config();
const express = require("express");
const cookie = require("cookie-parser");
require("./config/db.config");

const app = express();
const port = 5000;

// declaration des routes
const authRoutes = require("./routes/Auth.routes");

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

// intercepte les coockies
app.use(cookie());

// intercepte les requete json
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log("Serveur lancé sur le port: " + port);
});
