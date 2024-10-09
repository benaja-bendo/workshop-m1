const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await User.find().select('-password').exec();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getUserById(req, res) {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId).select('-password').exec();
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async createUser(req, res) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        weight: req.body.weight,
        height: req.body.height,
        gender: req.body.gender,
        dietaryRegime: req.body.dietaryRegime,
        undesirableIngredients: req.body.undesirableIngredients,
        goals: req.body.goals,
        birthday: req.body.birthday
      });

      await newUser.save();

      const userToReturn = newUser.toObject();
      delete userToReturn.password;

      res.status(201).json(userToReturn);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async updateUser(req, res) {
    try {
      const userId = req.params.id;
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true }).select('-password').exec();
      if (!updatedUser) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      await User.findByIdAndDelete(userId);
      res.status(204).json({ message: 'Utilisateur supprimé' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email })
        .select('+password')
        .exec();

      if (!user) {
        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      }

      const isMatch = await bcrypt.compare(req.body.password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ token });
    } catch (err) {
      console.error('Erreur lors de la tentative de connexion :', err);
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = UserController;