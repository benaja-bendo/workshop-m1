require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');
const connectDB = require('./config/database');
const authMiddleware = require('./middleware/authMiddleware');
const ErrorHandler = require('./utils/errorHandler');
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const ingredientRoutes = require('./routes/ingredientRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Connexion à MongoDB
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/ingredients', ingredientRoutes);

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Gestion des erreurs
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route non trouvée' });
});
app.use(ErrorHandler.handleErrors);

module.exports = app;

const ports = [process.env.PORT || 3000, 3001, 3002,3003]; // Définissez les ports que vous souhaitez essayer

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
