require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const exampleRoutes = require('./routes/exampleRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const ErrorHandler = require('./utils/errorHandler'); // Ajoutez cette ligne

const app = express();


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connexion à MongoDB
connectDB();

// Routes
app.use('/api/examples', [authMiddleware], exampleRoutes);

// Gestion des erreurs
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route non trouvée' });
});
app.use(ErrorHandler.handleErrors); // Cette ligne devrait maintenant fonctionner

// Démarrage du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
