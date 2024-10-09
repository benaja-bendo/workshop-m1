const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  recipeId: {
    type: String,
    length: 36,
    required: true
  },
  recipeName: {
    type: String,
    required: true
  },
  totalTimeMinutes: {
    type: Number,
    integer: true
  },
  servings: {
    type: Number,
    integer: true
  },
  ingredients: {
    type: Object,
    default: {}
  },
  directions: {
    type: String
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    precision: 1
  },
  url: {
    type: String
  },
  nutrition: {
    type: Object,
    default: {}
  },
  imgSrc: {
    type: String
  },
  diet: {
    type: [String],
    enum: ['vegetarian', 'vegan', 'gluten-free', 'low-carb','omnivore','pescitarian']
  },
  tags: {
    type: [String]
  }
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);
