// Importer express et axios
const express = require("express");
const axios = require("axios");

// Créer un routeur
const router = express.Router();

// Récupérer la clé de l'API
const MARVEL_API_KEY = process.env.MARVEL_API_KEY;

// Route GET pour récupérer la liste des personnages
router.get("/", async (req, res) => {
  try {
    let limit = 100;

    let filters = "";
    if (req.query.name) {
      filters += `&name=${req.query.name}`;
    }
    if (req.query.limit) {
      filters += `&limit=${req.query.limit}`;
    }
    if (req.query.page) {
      filters += `&skip=${(req.query.page - 1) * limit}`;
    }
    // Requête GET pour récupérer les personnages
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${MARVEL_API_KEY}${filters}&limit=${limit}`
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
