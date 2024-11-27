// Importer express, mongoose + les modèles nécessaires et les routes
const express = require("express");
const mongoose = require("mongoose");

const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const User = require("../models/User");

const router = express.Router();

// Route pour l'inscription
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Vérification des champs requis
    if (!username) {
      return res
        .status(400)
        .json({ message: "Merci de renseigner un nom de super-héros" });
    }
    if (!email) {
      return res.status(400).json({ message: "Merci de renseigner un email" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ message: "Merci de renseigner un mot de passe" });
    }

    // Vérification si l'email existe déjà
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "L'adresse mail est déjà utilisée" });
    }

    // Génération du salt et hashage du mot de passe
    const salt = uid2(16);
    const hash = SHA256(password + salt).toString(encBase64);

    // Génération du token
    const token = uid2(64);

    // Création de l'utilisateur
    const newUser = new User({
      email,
      username,
      token,
      hash,
      salt,
    });

    // Sauvegarde dans la BDD
    await newUser.save();

    res.status(201).json({
      user: {
        email: newUser.email,
        username: newUser.username,
        token: newUser.token,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route pour la connexion
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Vérification des champs requis
    if (!email) {
      return res.status(400).json({ message: "Merci de renseigner un email" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ message: "Merci de renseigner un mot de passe" });
    }

    // Trouver l'utilisateur
    const userFound = await User.findOne({ email });

    if (!userFound) {
      return res.status(401).json({ message: "Super-héros non trouvé" });
    }

    // Vérification du mot de passe
    const newHash = SHA256(password + userFound.salt).toString(encBase64);

    if (newHash !== userFound.hash) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    // Connexion réussie
    res.status(200).json({
      _id: userFound._id,
      token: userFound.token,
      account: {
        username: userFound.username,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Exporter le routeur
module.exports = router;
