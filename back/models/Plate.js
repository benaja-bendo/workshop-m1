const mongoose = require('mongoose');

const plateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['starter', 'main course', 'dessert'], required: true },
  season: { type: String, required: true },
  ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }],
  recipe: String,
}, { timestamps: true });

module.exports = mongoose.model('Plate', plateSchema);
