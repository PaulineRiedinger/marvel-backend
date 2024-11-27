// Importer express et axios
const express = require("express");
const axios = require("axios");

// Créer un routeur
const router = express.Router();

// Définir l'URL de l'API
const MARVEL_API_URL = "https://lereacteur-marvel-api.herokuapp.com/";
// Récupérer la clé de l'API
const MARVEL_API_KEY = process.env.MARVEL_API_KEY;

// Route pour récupérer la liste des comics
router.get("/", async (req, res) => {
  try {
    // Requête GET pour récupérer les comics
    const response = await axios.get(
      `${MARVEL_API_URL}comics?apiKey=${MARVEL_API_KEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    // Si erreur -> message d'erreur
    res.status(500).json({
      message:
        "Erreur lors de la récupération des comics... Il semble que Hulk ait tout détruit en passant !",
    });
  }
});

// Exporter le routeur
module.exports = router;
