const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');

class RecipeController {
  async getAllRecipes(req, res) {
    try {
      const recipes = await Recipe.find().exec();
      res.json(recipes);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getRecipeById(req, res) {
    try {
      const recipeId = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(recipeId)) {
        return res.status(404).json({ message: 'Recette non trouvée' });
      }

      const recipe = await Recipe.findById(recipeId).exec();
      if (!recipe) {
        return res.status(404).json({ message: 'Recette non trouvée' });
      }
      res.json(recipe);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async createRecipe(req, res) {
    try {
      const newRecipe = new Recipe({
        id: req.body.id,
        recipeId: req.body.recipeId,
        recipeName: req.body.recipeName,
        totalTimeMinutes: req.body.totalTimeMinutes,
        servings: req.body.servings,
        ingredients: req.body.ingredients,
        directions: req.body.directions,
        rating: req.body.rating,
        url: req.body.url,
        nutrition: req.body.nutrition,
        imgSrc: req.body.imgSrc,
        diet: req.body.diet,
        tags: req.body.tags
      });

      await newRecipe.save();
      res.status(201).json(newRecipe);
    } catch (err) {
      console.error("Error in createRecipe:", err);
      res.status(400).json({ message: err.message });
    }
  }

  async updateRecipe(req, res) {
    try {
      const recipeId = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(recipeId)) {
        return res.status(400).json({ message: 'ID de recette invalide' });
      }

      const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, req.body, { new: true }).exec();
      if (!updatedRecipe) {
        return res.status(404).json({ message: 'Recette non trouvée' });
      }
      res.json(updatedRecipe);
    } catch (err) {
      console.error("Error in updateRecipe:", err);
      res.status(500).json({ message: err.message });
    }
  }

  async deleteRecipe(req, res) {
    try {
      const recipeId = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(recipeId)) {
        return res.status(400).json({ message: 'ID de recette invalide' });
      }

      const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
      if (!deletedRecipe) {
        return res.status(404).json({ message: 'Recette non trouvée' });
      }
      res.status(204).json({ message: 'Recette supprimée' });
    } catch (err) {
      console.error("Error in deleteRecipe:", err);
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = RecipeController;
