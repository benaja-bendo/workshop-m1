# API Node.js avec MongoDB

Ce projet est une API RESTful construite avec Node.js et utilisant MongoDB comme base de données. Il suit une architecture MVC (Model-View-Controller) et est conçu pour être scalable.

## Table des matières

- [Installation](#installation)
- [Structure du projet](#structure-du-projet)
- [Commandes disponibles](#commandes-disponibles)
- [Architecture](#architecture)
- [Développement](#développement)

## Installation

Pour installer le projet :

`bash npm install`


## Structure du projet

Le projet est organisé de la manière suivante :

node-api-mongodb/ 
├── config/ 
│ └── database.js 
├── controllers/ 
│ └── exampleController.js 
├── middleware/ 
│ └── authMiddleware.js 
├── models/ 
│ └── exampleModel.js 
├── routes/ 
│ └── exampleRoutes.js 
├── utils/ 
│ └── errorHandler.js 
├── .env 
├── .gitignore 
├── package.json 
└── server.js

## Commandes disponibles

- `npm start`: Lance le serveur en mode production
- `npm run dev`: Lance le serveur en mode développement avec nodemon
- `npm run lint`: Exécute ESLint pour vérifier la qualité du code

## Architecture

L'architecture suivie est une variante de MVC :

- **Models**: Définissent la structure des données et les interactions avec MongoDB
- **Controllers**: Gèrent la logique métier et interagissent avec les models
- **Routes**: Définissent les endpoints de l'API et appellent les controllers appropriés
- **Middleware**: Fonctionnalités réutilisables comme l'authentification ou le parsing JSON

## Développement

Pour ajouter une nouvelle fonctionnalité :

1. Créez un nouveau modèle dans `models/`
2. Ajoutez un contrôleur correspondant dans `controllers/`
3. Définissez les routes dans `routes/`
4. Implémentez la logique métier dans le contrôleur
5. Testez votre nouvelle fonctionnalité

N'hésitez pas à contribuer au projet en soumettant des pull requests ou en signalant des bugs via les issues GitHub.
