const rateLimit = require('express-rate-limit');
const winston = require('winston');

// Configurer le logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: '../logs/login-attempts.log' }) // Chemin du fichier log
  ]
});

// Créer un limiteur de requêtes
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limiter à 5 requêtes par IP par fenêtre de temps
  message: 'Trop de tentatives de connexion, veuillez réessayer plus tard.',
  handler: (req, res) => {
    logger.info(`Tentative de connexion échouée pour l'IP: ${req.ip} à ${new Date().toISOString()}`);
    res.status(429).send('Trop de tentatives de connexion. Veuillez réessayer plus tard.');
  }
});

// Exporter le limiteur
module.exports = loginLimiter;
