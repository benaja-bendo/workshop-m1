const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Veuillez entrer une adresse email valide']
  },
  password: { type: String, required: true },
  weight: Number,
  height: Number,
  gender: String,
  dietaryRegime: String,
  undesirableIngredients: Array,
  goals: Array,
  birthday: Date,
  testCreated: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
