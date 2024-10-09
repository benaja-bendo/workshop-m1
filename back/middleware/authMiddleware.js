const authMiddleware = async (req, res, next) => {
  // Logique d'authentification
  next();
};

module.exports = authMiddleware;
