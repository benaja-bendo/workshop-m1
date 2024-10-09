const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const loginLimiter = require('../middleware/rateLimiter'); // Importer le middleware de limitation de taux

const userController = new UserController();

// Routes pour les utilisateurs
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// Route de connexion avec protection contre les attaques par force brute
router.post('/login', loginLimiter, userController.login); // Appliquer le middleware ici

module.exports = router;
