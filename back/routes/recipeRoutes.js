// routes/recipe.js
const express = require('express');
const router = express.Router();
const RecipeController = require('../controllers/recipeController');

const recipeController = new RecipeController();

router.get('/', recipeController.getAllRecipes);
router.get('/:id', recipeController.getRecipeById);
router.post('/', recipeController.createRecipe);
router.put('/:id', recipeController.updateRecipe);
router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;
