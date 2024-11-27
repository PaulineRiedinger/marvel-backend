// Importer express et axios
const express = require("express");
const axios = require("axios");

// Créer un routeur
const router = express.Router();

// Définir l'URL de l'API
const MARVEL_API_URL = "https://lereacteur-marvel-api.herokuapp.com/";
// Récupérer la clé de l'API
const MARVEL_API_KEY = process.env.MARVEL_API_KEY;

// Route GET pour récupérer les informations d'un personnage spécifique
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Récupère le paramètre id
    const url = `${MARVEL_API_URL}character/${id}?apiKey=${MARVEL_API_KEY}`;
    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    if (error.response) {
    }
    res.status(500).json({
      message:
        "Le personnage est introuvable... Peut-être qu'une distorsion temporelle l'a effacé de notre réalité !",
    });
  }
});

// Exporter le routeur
module.exports = router;
