const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['fruit', 'vegetable', 'meat', 'fish', 'grain', 'milk', 'other'], required: true },
  quantityType: { type: String, enum: ['g', 'kg', 'unit', 'tablespoon', 'teaspoon'], required: true },
  quantity: Number,
  calories: Number,
  proteins: Number,
  sugars: Number,
  salt: Number,
  restrictions: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Ingredient', ingredientSchema);
