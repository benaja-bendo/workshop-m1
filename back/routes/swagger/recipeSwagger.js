/**
 * @swagger
 * tags:
 *   name: Recipe
 *   description: Gestion des recettes
 */

/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: Récupérer toutes les recettes
 *     tags: [Recipe]
 *     responses:
 *       200:
 *         description: Liste de toutes les recettes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   recipeId:
 *                     type: string
 *                   recipeName:
 *                     type: string
 *                   totalTimeMinutes:
 *                     type: integer
 *                   servings:
 *                     type: integer
 *                   ingredients:
 *                     type: array
 *                     items:
 *                       type: string
 *                   directions:
 *                     type: array
 *                     items:
 *                       type: string
 *                   rating:
 *                     type: number
 *                   url:
 *                     type: string
 *                   nutrition:
 *                     type: object
 *                     properties:
 *                       calories:
 *                         type: number
 *                       protein:
 *                         type: number
 *                       carbs:
 *                         type: number
 *                       fat:
 *                         type: number
 *                   imgSrc:
 *                     type: string
 *                   diet:
 *                     type: string
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 *       500:
 *         description: Erreur interne du serveur
 */

/**
 * @swagger
 * /recipes/{id}:
 *   get:
 *     summary: Récupérer une recette par ID
 *     tags: [Recipe]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la recette à récupérer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recette trouvée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 recipeId:
 *                   type: string
 *                 recipeName:
 *                   type: string
 *                 totalTimeMinutes:
 *                   type: integer
 *                 servings:
 *                   type: integer
 *                 ingredients:
 *                   type: array
 *                   items:
 *                     type: string
 *                 directions:
 *                   type: array
 *                   items:
 *                     type: string
 *                 rating:
 *                   type: number
 *                 url:
 *                   type: string
 *                 nutrition:
 *                   type: object
 *                   properties:
 *                     calories:
 *                       type: number
 *                     protein:
 *                       type: number
 *                     carbs:
 *                       type: number
 *                     fat:
 *                       type: number
 *                 imgSrc:
 *                   type: string
 *                 diet:
 *                   type: string
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Recette non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */

/**
 * @swagger
 * /recipes:
 *   post:
 *     summary: Créer une nouvelle recette
 *     tags: [Recipe]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipeId:
 *                 type: string
 *                 description: ID unique de la recette
 *               recipeName:
 *                 type: string
 *                 description: Nom de la recette
 *               totalTimeMinutes:
 *                 type: integer
 *                 description: Temps total en minutes
 *               servings:
 *                 type: integer
 *                 description: Nombre de portions
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Liste des ingrédients
 *               directions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Étapes de préparation
 *               rating:
 *                 type: number
 *                 description: Note de la recette
 *               url:
 *                 type: string
 *                 description: URL de la recette
 *               nutrition:
 *                 type: object
 *                 properties:
 *                   calories:
 *                     type: number
 *                   protein:
 *                     type: number
 *                   carbs:
 *                     type: number
 *                   fat:
 *                     type: number
 *                 description: Informations nutritionnelles
 *               imgSrc:
 *                 type: string
 *                 description: Lien vers l'image de la recette
 *               diet:
 *                 type: string
 *                 description: Régime alimentaire associé
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Tags associés à la recette
 *     responses:
 *       201:
 *         description: Recette créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 recipeId:
 *                   type: string
 *                 recipeName:
 *                   type: string
 *                 totalTimeMinutes:
 *                   type: integer
 *                 servings:
 *                   type: integer
 *                 ingredients:
 *                   type: array
 *                   items:
 *                     type: string
 *                 directions:
 *                   type: array
 *                   items:
 *                     type: string
 *                 rating:
 *                   type: number
 *                 url:
 *                   type: string
 *                 nutrition:
 *                   type: object
 *                   properties:
 *                     calories:
 *                       type: number
 *                     protein:
 *                       type: number
 *                     carbs:
 *                       type: number
 *                     fat:
 *                       type: number
 *                 imgSrc:
 *                   type: string
 *                 diet:
 *                   type: string
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur interne du serveur
 */

/**
 * @swagger
 * /recipes/{id}:
 *   put:
 *     summary: Mettre à jour une recette
 *     tags: [Recipe]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la recette à mettre à jour
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipeName:
 *                 type: string
 *               totalTimeMinutes:
 *                 type: integer
 *               servings:
 *                 type: integer
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               directions:
 *                 type: array
 *                 items:
 *                   type: string
 *               rating:
 *                 type: number
 *               url:
 *                 type: string
 *               nutrition:
 *                 type: object
 *                 properties:
 *                   calories:
 *                     type: number
 *                   protein:
 *                     type: number
 *                   carbs:
 *                     type: number
 *                   fat:
 *                     type: number
 *               imgSrc:
 *                 type: string
 *               diet:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Recette mise à jour avec succès
 *       404:
 *         description: Recette non trouvée
 *       400:
 *         description: ID de recette invalide
 *       500:
 *         description: Erreur interne du serveur
 */

/**
 * @swagger
 * /recipes/{id}:
 *   delete:
 *     summary: Supprimer une recette
 *     tags: [Recipe]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la recette à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Recette supprimée avec succès
 *       404:
 *         description: Recette non trouvée
 *       400:
 *         description: ID de recette invalide
 *       500:
 *         description: Erreur interne du serveur
 */

