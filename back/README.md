# API Node.js avec MongoDB

Ce projet est une API RESTful construite avec Node.js et utilisant MongoDB comme base de données. Il suit une architecture MVC (Model-View-Controller) et est conçu pour être scalable.

## Table des matières

- [Installation](#installation)
- [Commandes disponibles](#commandes-disponibles)
- [Architecture](#architecture)
- [Développement](#développement)

## Installation

Pour installer le projet exécuter la commande suivante :
```bash
npm install
```
Puis, créez un fichier `.env` à la racine du projet et ajoutez les variables d'environnement
comme indiquer dans le fichier `.env.sample`.

## Documentation  

http://localhost:3000/api-docs


## Commandes disponibles

- `npm start`: Lance le serveur en mode production
- `npm run dev`: Lance le serveur en mode développement avec nodemon
- `npm run lint`: Exécute ESLint pour vérifier la qualité du code
- `npm run test`: Exécute tous les tests

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
5. Testez votre nouvelle fonctionnalité en rajoutant des tests dans `tests/`
