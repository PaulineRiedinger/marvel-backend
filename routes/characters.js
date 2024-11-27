// Importer express et axios
const express = require("express");
const axios = require("axios");

// Créer un routeur
const router = express.Router();

// Définir l'URL de l'API
const MARVEL_API_URL = "https://lereacteur-marvel-api.herokuapp.com/";
// Récupérer la clé de l'API
const MARVEL_API_KEY = process.env.MARVEL_API_KEY;

// Route GET pour récupérer la liste des personnages
router.get("/", async (req, res) => {
  try {
    // Requête GET pour récupérer les personnages
    const response = await axios.get(
      `${MARVEL_API_URL}characters?apiKey=${MARVEL_API_KEY}`
    );
    res.status(200).json(response.data); // Envoie les données reçues de l'API
  } catch (error) {
    // Si erreur -> message d'erreur
    res.status(500).json({
      message:
        "Erreur lors de la récupération des personnages... C'est comme si Doctor Strange avait modifié la réalité !",
    });
  }
});

// Exporter le routeur
module.exports = router;
