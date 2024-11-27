const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  try {
    // Récupérer le token de l'en-tête Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(401)
        .json({
          error:
            "Accès refusé ! Même Iron Man ne peut pas pénétrer ici sans autorisation !",
        });
    }

    const token = authHeader.replace("Bearer ", "");

    // Chercher l'utilisateur correspondant au token
    const user = await User.findOne({ token: token }).select("-salt -hash");

    if (!user) {
      return res
        .status(401)
        .json({
          error:
            "Accès refusé ! Même Iron Man ne peut pas pénétrer ici sans autorisation !",
        });
    }

    req.user = user; // Attacher l'utilisateur à la requête
    next(); // Passer au middleware suivant
  } catch (error) {
    res
      .status(500)
      .json({
        error:
          "Erreur 500 : Le serveur est dans un univers parallèle, il va falloir patienter !",
      });
  }
};

module.exports = isAuthenticated;
