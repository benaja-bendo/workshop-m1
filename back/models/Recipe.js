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
  recipeType: {
    type: String,
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
    type: Map,
    of: new mongoose.Schema({
      amount: { type: Number, required: true },
      unit: { type: String, default: null }
    }),
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
    type: Map,
    of: new mongoose.Schema({
      amount: { type: String, required: true },
      percent: { type: String, default: null }
    }),
    default: {}
  },
  imgSrc: {
    type: String
  },
  diet: {
    type: [String],
    enum: ['vegetarian', 'vegan', 'gluten-free', 'low-carb', 'omnivore', 'pescitarian']
  },
  tags: {
    type: [String]
  },
  testCreated: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);
