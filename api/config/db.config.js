const mongoose = require("mongoose");

//* connection a la base de donnée mongoDB via mongoose
mongoose
  .connect(`${process.env.MONGODB_DATABASE_LINK}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
