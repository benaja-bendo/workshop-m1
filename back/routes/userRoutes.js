// routes/user.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

const userController = new UserController();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs sans mots de passe
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *                   weight:
 *                     type: number
 *                   height:
 *                     type: number
 *                   gender:
 *                     type: string
 *                   dietaryRegime:
 *                     type: string
 *                   undesirableIngredients:
 *                     type: array
 *                     items:
 *                       type: string
 *                   goals:
 *                     type: array
 *                     items:
 *                       type: string
 *                   birthday:
 *                     type: string
 *                     format: date
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/', userController.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Récupérer un utilisateur par ID
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de l'utilisateur
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur trouvé sans mot de passe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 weight:
 *                   type: number
 *                 height:
 *                   type: number
 *                 gender:
 *                   type: string
 *                 dietaryRegime:
 *                   type: string
 *                 undesirableIngredients:
 *                   type: array
 *                   items:
 *                     type: string
 *                 goals:
 *                   type: array
 *                   items:
 *                     type: string
 *                 birthday:
 *                   type: string
 *                   format: date
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/:id', userController.getUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Prénom de l'utilisateur
 *               lastName:
 *                 type: string
 *                 description: Nom de l'utilisateur
 *               username:
 *                 type: string
 *                 description: Nom d'utilisateur
 *               email:
 *                 type: string
 *                 description: Adresse email de l'utilisateur
 *               password:
 *                 type: string
 *                 description: Mot de passe de l'utilisateur
 *               weight:
 *                 type: number
 *                 description: Poids de l'utilisateur
 *               height:
 *                 type: number
 *                 description: Taille de l'utilisateur
 *               gender:
 *                 type: string
 *                 description: Genre de l'utilisateur
 *               dietaryRegime:
 *                 type: string
 *                 description: Régime alimentaire
 *               undesirableIngredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Ingrédients à éviter
 *               goals:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Objectifs de l'utilisateur
 *               birthday:
 *                 type: string
 *                 format: date
 *                 description: Date de naissance de l'utilisateur
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 weight:
 *                   type: number
 *                 height:
 *                   type: number
 *                 gender:
 *                   type: string
 *                 dietaryRegime:
 *                   type: string
 *                 undesirableIngredients:
 *                   type: array
 *                   items:
 *                     type: string
 *                 goals:
 *                   type: array
 *                   items:
 *                     type: string
 *                 birthday:
 *                   type: string
 *                   format: date
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/', userController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Mettre à jour un utilisateur
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de l'utilisateur à mettre à jour
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Prénom de l'utilisateur
 *               lastName:
 *                 type: string
 *                 description: Nom de l'utilisateur
 *               username:
 *                 type: string
 *                 description: Nom d'utilisateur
 *               email:
 *                 type: string
 *                 description: Adresse email de l'utilisateur
 *               password:
 *                 type: string
 *                 description: Mot de passe de l'utilisateur
 *               weight:
 *                 type: number
 *                 description: Poids de l'utilisateur
 *               height:
 *                 type: number
 *                 description: Taille de l'utilisateur
 *               gender:
 *                 type: string
 *                 description: Genre de l'utilisateur
 *               dietaryRegime:
 *                 type: string
 *                 description: Régime alimentaire
 *               undesirableIngredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Ingrédients à éviter
 *               goals:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Objectifs de l'utilisateur
 *               birthday:
 *                 type: string
 *                 format: date
 *                 description: Date de naissance de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 weight:
 *                   type: number
 *                 height:
 *                   type: number
 *                 gender:
 *                   type: string
 *                 dietaryRegime:
 *                   type: string
 *                 undesirableIngredients:
 *                   type: array
 *                   items:
 *                     type: string
 *                 goals:
 *                   type: array
 *                   items:
 *                     type: string
 *                 birthday:
 *                   type: string
 *                   format: date
 *       404:
 *         description: Utilisateur non trouvé
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur interne du serveur
 */
router.put('/:id', userController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de l'utilisateur à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Utilisateur supprimé avec succès
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.delete('/:id', userController.deleteUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Adresse email de l'utilisateur
 *               password:
 *                 type: string
 *                 description: Mot de passe de l'utilisateur
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Identifiants invalides
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/login', userController.login);

module.exports = router;