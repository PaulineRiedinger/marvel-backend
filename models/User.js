// Import mongoose
const mongoose = require("mongoose");

// Déclarer un modèle mongoose User pour créer une collection User dans la BDD
const User = mongoose.model("User", {
  email: String,
  username: String,
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
