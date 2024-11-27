// Importer express axios et mongoose
const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");

// Importer dotenv pour utiliser l'API
require("dotenv").config();

// Créer le serveur
const app = express();

// Récupérer des bodys dans les routes
app.use(express.json());

// Définir l'URL de l'API
const MARVEL_API_URL = "https://lereacteur-marvel-api.herokuapp.com/";

// Importer les routes
const characterIdRouter = require("./routes/characterId");
const charactersRouter = require("./routes/characters");
const comicIdRouter = require("./routes/comicId");
const comicsRouter = require("./routes/comics");
const comicsByCharacterIdRouter = require("./routes/comicsByCharacterId");
const userRouter = require("./routes/user");

// Se connecter à la base de données
mongoose.connect(process.env.MONGODB_URI);

// Utiliser les routers avec des chemins spécifiques
app.use("/characters", charactersRouter);
app.use("/characterId", characterIdRouter);
app.use("/comicId", comicIdRouter);
app.use("/comics", comicsRouter);
app.use("/comicsByCharacterId", comicsByCharacterIdRouter);
app.use("/", userRouter);

// Créer une route GET d'accueil
app.get("/", (req, res) => {
  res.status(200).json({
    message:
      "Un grand pouvoir implique de grandes responsabilités... Bienvenue sur le MarvelVerse !",
  });
});

// Créer une route pour gérer les routes inconnues
app.all("*", (req, res) => {
  res.status(404).json({
    message:
      "Spider-Man a dû se prendre dans sa propre toile... Route introuvable, 404 !",
  });
});

// Lancer le serveur
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Serveur démarré, en route pour sauver le monde 🦸 !");
});
