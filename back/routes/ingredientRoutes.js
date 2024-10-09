const express = require('express');
const router = express.Router();
const IngredientController = require('../controllers/ingredientController');

const ingredientController = new IngredientController();

router.get('/', ingredientController.getAllIngredients);
router.get('/:id', ingredientController.getIngredientById);
router.post('/', ingredientController.createIngredient);
router.put('/:id', ingredientController.updateIngredient);
router.delete('/:id', ingredientController.deleteIngredient);

module.exports = router;
