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

const ports = [process.env.PORT || 3000, 3001]; // Définissez les ports que vous souhaitez essayer

const startServer = (port) => {
    app.listen(port, () => {
        console.log(`Serveur démarré sur le port ${port}`);
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Le port ${port} est déjà utilisé. Essayer le prochain port...`);
            const nextPort = ports.shift(); // Retirer le premier port de la liste
            if (nextPort) {
                startServer(nextPort); // Essayer le port suivant
            } else {
                console.error('Aucun port disponible. Le serveur ne peut pas démarrer.');
            }
        } else {
            console.error('Erreur lors du démarrage du serveur:', err);
        }
    });
};

startServer(ports.shift()); // Démarrer le serveur avec le premier port
