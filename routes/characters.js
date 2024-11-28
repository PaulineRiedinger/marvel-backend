const express = require("express");
const axios = require("axios");

const router = express.Router();

const MARVEL_API_KEY = process.env.MARVEL_API_KEY;

router.get("/", async (req, res) => {
  try {
    let limit = req.query.limit || 100; // Par défaut, 100 résultats
    let filters = "";

    if (req.query.name) {
      filters += `&name=${req.query.name}`;
    }
    if (req.query.page) {
      filters += `&offset=${(req.query.page - 1) * limit}`;
    }

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${MARVEL_API_KEY}${filters}&limit=${limit}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Erreur API Marvel :", error.response?.data || error.message);
    res.status(500).json({
      message:
        "Erreur lors de la récupération des personnages... C'est comme si Doctor Strange avait modifié la réalité !",
    });
  }
});

module.exports = router;
