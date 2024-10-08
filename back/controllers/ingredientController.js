const Ingredient = require('../models/Ingredient');

class IngredientController {
  async getAllIngredients(req, res) {
    try {
      const ingredients = await Ingredient.find().exec();
      res.json(ingredients);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getIngredientById(req, res) {
    try {
      const ingredientId = req.params.id;
      const ingredient = await Ingredient.findById(ingredientId).exec();
      if (!ingredient) {
        return res.status(404).json({ message: 'Ingrédient non trouvé' });
      }
      res.json(ingredient);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async createIngredient(req, res) {
    try {
      const newIngredient = new Ingredient({
        name: req.body.name,
        type: req.body.type,
        quantityType: req.body.quantityType,
        quantity: req.body.quantity,
        calories: req.body.calories,
        proteins: req.body.proteins,
        sugars: req.body.sugars,
        salt: req.body.salt,
        restrictions: req.body.restrictions
      });
      await newIngredient.save();
      res.status(201).json(newIngredient);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async updateIngredient(req, res) {
    try {
      const ingredientId = req.params.id;
      const updatedIngredient = await Ingredient.findByIdAndUpdate(ingredientId, req.body, { new: true }).exec();
      if (!updatedIngredient) {
        return res.status(404).json({ message: 'Ingrédient non trouvé' });
      }
      res.json(updatedIngredient);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async deleteIngredient(req, res) {
    try {
      const ingredientId = req.params.id;
      await Ingredient.findByIdAndDelete(ingredientId);
      res.status(204).json({ message: 'Ingrédient supprimé' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = IngredientController;
