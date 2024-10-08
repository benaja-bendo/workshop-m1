require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const authMiddleware = require('./middleware/authMiddleware');
const ErrorHandler = require('./utils/errorHandler');
const userRoutes = require('./routes/userRoutes');
const plateRoutes = require('./routes/plateRoutes');
const ingredientRoutes = require('./routes/ingredientRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connexion à MongoDB
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/plates', plateRoutes);
app.use('/api/ingredients', ingredientRoutes);
// Gestion des erreurs
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route non trouvée' });
});
app.use(ErrorHandler.handleErrors);

module.exports = app;

// Démarrage du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
