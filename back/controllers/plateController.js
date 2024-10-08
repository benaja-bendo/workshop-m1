const mongoose = require('mongoose');
const Plate = require('../models/Plate');
const Ingredient = require('../models/Ingredient');

class PlateController {
  async getAllPlates(req, res) {
    try {
      const plates = await Plate.find().populate('ingredients').exec();
      res.json(plates);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getPlateById(req, res) {
    try {
      const plateId = req.params.id;

      // Check if the ID is valid before querying the database
      if (!mongoose.Types.ObjectId.isValid(plateId)) {
        return res.status(404).json({ message: 'Plat non trouvé' }); // Return 404 for invalid ID
      }

      const plate = await Plate.findById(plateId).populate('ingredients').exec();
      if (!plate) {
        return res.status(404).json({ message: 'Plat non trouvé' });
      }
      res.json(plate);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async createPlate(req, res) {
    try {
      // Vérifier la validité des IDs d'ingrédients
      const validIngredients = req.body.ingredients.filter(id =>
        mongoose.Types.ObjectId.isValid(id)
      );

      if (validIngredients.length !== req.body.ingredients.length) {
        throw new Error('Invalid ingredient IDs');
      }

      // Vérifier que les ingrédients existent dans la base de données
      const existingIngredients = await Ingredient.find({ _id: { $in: validIngredients } });
      if (existingIngredients.length !== validIngredients.length) {
        throw new Error('Some ingredients do not exist');
      }

      // Créer le nouveau plat
      const newPlate = new Plate({
        name: req.body.name,
        type: req.body.type,
        season: req.body.season,
        ingredients: validIngredients.map(id => new mongoose.Types.ObjectId(id)), // Assurez-vous d'utiliser 'new'
        recipe: req.body.recipe
      });

      await newPlate.save();
      res.status(201).json(newPlate);
    } catch (err) {
      console.error("Error in createPlate:", err); // Ajoutez un log d'erreur pour le débogage
      res.status(400).json({ message: err.message });
    }
  }

  async updatePlate(req, res) {
    try {
      const plateId = req.params.id;

      // Vérifiez si l'ID est un ObjectId valide
      if (!mongoose.Types.ObjectId.isValid(plateId)) {
        return res.status(400).json({ message: 'Invalid plate ID' });
      }

      // Vérifiez si les ingrédients sont valides
      if (req.body.ingredients) {
        const validIngredients = req.body.ingredients.filter(id =>
          mongoose.Types.ObjectId.isValid(id)
        );

        const existingIngredients = await Ingredient.find({ _id: { $in: validIngredients } });
        if (existingIngredients.length !== validIngredients.length) {
          throw new Error('Some ingredients do not exist');
        }
      }

      const updatedPlate = await Plate.findByIdAndUpdate(plateId, req.body, { new: true }).populate('ingredients').exec();
      if (!updatedPlate) {
        return res.status(404).json({ message: 'Plat non trouvé' });
      }
      res.json(updatedPlate);
    } catch (err) {
      console.error("Error in updatePlate:", err); // Ajoutez un log d'erreur pour le débogage
      res.status(500).json({ message: err.message });
    }
  }



  async deletePlate(req, res) {
    try {
      const plateId = req.params.id;

      // Vérifiez si l'ID est un ObjectId valide
      if (!mongoose.Types.ObjectId.isValid(plateId)) {
        return res.status(400).json({ message: 'Invalid plate ID' });
      }

      const deletedPlate = await Plate.findByIdAndDelete(plateId);
      if (!deletedPlate) {
        return res.status(404).json({ message: 'Plat non trouvé' });
      }
      res.status(204).json({ message: 'Plat supprimé' });
    } catch (err) {
      console.error("Error in deletePlate:", err); // Ajoutez un log d'erreur pour le débogage
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = PlateController;
