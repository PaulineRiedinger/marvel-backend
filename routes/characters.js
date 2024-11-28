const express = require("express");
const axios = require("axios");
const router = express.Router();

const MARVEL_API_KEY = process.env.MARVEL_API_KEY;

router.get("/", async (req, res) => {
  try {
    // Récupérer le limit et la page depuis la requête
    const limit = parseInt(req.query.limit) || 100;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    let filters = "";
    if (req.query.name) {
      filters += `&name=${req.query.name}`;
    }

    // Appel à l'API Marvel pour récupérer les personnages avec pagination
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${MARVEL_API_KEY}${filters}&limit=${limit}&skip=${skip}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({
      message:
        "Erreur lors de la récupération des personnages... C'est comme si Doctor Strange avait modifié la réalité !",
    });
  }
});

module.exports = router;
