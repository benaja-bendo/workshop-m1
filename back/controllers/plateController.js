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
      const newPlate = new Plate({
        name: req.body.name,
        type: req.body.type,
        season: req.body.season,
        ingredients: req.body.ingredients,
        recipe: req.body.recipe
      });
      await newPlate.save();
      res.status(201).json(newPlate);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async updatePlate(req, res) {
    try {
      const plateId = req.params.id;
      const updatedPlate = await Plate.findByIdAndUpdate(plateId, req.body, { new: true }).populate('ingredients').exec();
      if (!updatedPlate) {
        return res.status(404).json({ message: 'Plat non trouvé' });
      }
      res.json(updatedPlate);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async deletePlate(req, res) {
    try {
      const plateId = req.params.id;
      await Plate.findByIdAndDelete(plateId);
      res.status(204).json({ message: 'Plat supprimé' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = PlateController;
