// swagger.js
const swaggerJsDoc = require('swagger-jsdoc');

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
        url: 'https://workshop-m1-back.onrender.com/api', // URL de l'API
      },
    ],
  },
  // Chemin vers les fichiers contenant les annotations Swagger
  apis: ['./routes/*.js'], // Modifiez ce chemin selon votre structure de projet
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;