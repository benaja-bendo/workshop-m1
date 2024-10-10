const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const { spawn } = require('child_process');

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
        recipeType: req.body.recipeType,
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

  async getAllRecipesWithUser(req, res) {
    try {
      const userId = req.params.id; // Assurez-vous que l'ID utilisateur est bien attaché à la requête (par exemple via un middleware de vérification de JWT).

      // Vérifiez si l'ID utilisateur est valide
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({ message: `Utilisateur non trouvé ${userId}` });
      }

      const user = await User.findById(userId).select('-password').exec();
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      // Récupérez toutes les recettes de la base de données
      const recipes = await Recipe.find().exec();

      // Envoyer les données au script Python pour traitement
      const pythonProcess = spawn('python3', ['../script/get_menu.py']);

      // Préparer les données à envoyer au script Python
      const data = {
        recipes: JSON.stringify(recipes),
        diet: user.diet, // Exemple de champ dans la collection User
        tags: user.tags, // Tags utilisateur comme 'contain_gluten', 'contain_dairy', etc.
        weight: user.weight, // Poids en kg
        height: user.height, // Taille en cm
        age: user.age, // Âge de l'utilisateur
        goal: user.goal, // Objectif : 'maintain', 'weight loss', 'weight gain'
        servings: user.servings // Exemple de champ pour les portions souhaitées
      };

      // Envoyer les données en tant que JSON au script Python via stdin
      pythonProcess.stdin.write(JSON.stringify(data));
      pythonProcess.stdin.end();

      let output = '';

      pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`Erreur du script Python : ${data}`);
      });

      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          return res.status(500).json({ message: 'Erreur lors de l\'exécution du script Python' });
        }
        try {
          const parsedOutput = JSON.parse(output);
          res.json(parsedOutput);
        } catch (err) {
          res.status(500).json({ message: 'Erreur lors de la lecture de la réponse du script Python' });
        }
      });
    } catch (err) {
      console.error("Erreur dans getAllRecipesWithUser:", err);
      res.status(500).json({ message: err.message });
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
