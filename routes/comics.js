// Importer express et axios
const express = require("express");
const axios = require("axios");

// Créer un routeur
const router = express.Router();

// Récupérer la clé de l'API
const MARVEL_API_KEY = process.env.MARVEL_API_KEY;

// Route pour récupérer la liste des comics
router.get("/", async (req, res) => {
  try {
    // Lecture des paramètres avec des valeurs par défaut
    const limit = parseInt(req.query.limit) || 100;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    // Création des filtres dynamiques
    let filters = `&limit=${limit}&skip=${skip}`;
    if (req.query.title) {
      filters += `&title=${encodeURIComponent(req.query.title)}`;
    }

    // Requête à l'API Marvel
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${MARVEL_API_KEY}${filters}`
    );

    // Retour des données à l'utilisateur
    res.status(200).json(response.data);
  } catch (error) {
    // Gestion d'erreur
    res.status(error.response?.status || 500).json({
      message:
        error.response?.data?.message ||
        "Erreur lors de la récupération des comics... Il semble que Hulk ait tout détruit en passant !",
    });
  }
});

// Exporter le routeur
module.exports = router;
