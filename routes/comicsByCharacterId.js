// Importer express et axios
const express = require("express");
const axios = require("axios");

// Créer un routeur
const router = express.Router();

// Récupérer la clé de l'API
const MARVEL_API_KEY = process.env.MARVEL_API_KEY;

// Route GET pour récupérer les comics d'un personnage spécifique
router.get("/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${MARVEL_API_KEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({
      message:
        "Erreur en récupérant les comics... Peut-être que Thanos a snapé cette partie de la réalité !",
    });
  }
});

// Exporter le routeur
module.exports = router;
