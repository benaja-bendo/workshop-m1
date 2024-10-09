// swagger.js
const swaggerJsDoc = require('swagger-jsdoc');
// Détection de l'URL de l'API en fonction de l'environnement
const getServerUrl = () => {
  // Utiliser une variable d'environnement si elle est définie, par exemple pour Render ou Heroku
  const baseUrl = process.env.BASE_URL;

  // Si la variable d'environnement n'est pas définie, utilise localhost par défaut
  return baseUrl ? `${baseUrl}/api` : 'http://localhost:3000/api';
};
// Configuration de Swagger JSDoc
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0', // Version d'OpenAPI
    info: {
      title: 'Mon API', // Titre de l'API
      version: '1.0.0', // Version de l'API
      description: 'Documentation de mon API Node.js', // Description de l'API
    },
    servers: [
      {
        url: getServerUrl(), // URL de l'API
      },
    ],
  },
  // Chemin vers les fichiers contenant les annotations Swagger
  apis: ['./routes/*.js'], // Modifiez ce chemin selon votre structure de projet
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;