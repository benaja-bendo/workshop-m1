const request = require('supertest');
const express = require('express');
const app = express();
const UserController = require('../controllers/userController');

// Importez votre modèle User ici si nécessaire

describe('UserController', () => {
  let controller;

  beforeEach(() => {
    // Initialisez le contrôleur avec les dépendances nécessaires
    controller = new UserController();
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const mockUsers = [
        { firstName: 'Test1', lastName: 'User1', email: 'test1@example.com' },
        { firstName: 'Test2', lastName: 'User2', email: 'test2@example.com' }
      ];

      // Mockez la méthode find() du modèle User
      UserController.User.find.mockReturnValue(Promise.resolve(mockUsers));

      const res = await request(app).get('/api/users');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });
  });

  describe('getUserById', () => {
    it('should return a user by ID', async () => {
      const mockUser = { firstName: 'Test1', lastName: 'User1', email: 'test1@example.com' };

      // Mockez la méthode findById() du modèle User
      UserController.User.findById.mockReturnValue(Promise.resolve(mockUser));

      const res = await request(app).get('/api/users/1');

      expect(res.status).toBe(200);
      expect(res.body.firstName).toBe('Test1');
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const newUser = {
        firstName: 'TestUser',
        lastName: 'TestLastname',
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
        weight: 70,
        height: '180cm',
        gender: 'male',
        dietaryRegime: 'vegetarian',
        undesirableIngredients: ['gluten'],
        goals: ['weightLoss']
      };

      // Mockez la méthode hash() de bcrypt
      bcrypt.hash.mockImplementation((_, __, callback) => callback(null, 'hashedPassword'));

      const res = await request(app).post('/api/users').send(newUser);

      expect(res.status).toBe(201);
      expect(res.body.password).toBe('hashedPassword');
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const updateUser = {
        firstName: 'UpdatedTest',
        lastName: 'UpdatedUser'
      };

      // Mockez la méthode findByIdAndUpdate() du modèle User
      UserController.User.findByIdAndUpdate.mockReturnValue(Promise.resolve({ ...mockUser, ...updateUser }));

      const res = await request(app).put('/api/users/1').send(updateUser);

      expect(res.status).toBe(200);
      expect(res.body.firstName).toBe('UpdatedTest');
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const res = await request(app).delete('/api/users/1');

      expect(res.status).toBe(204);
    });
  });

  describe('login', () => {
    it('should login a user', async () => {
      const user = { email: 'testuser@example.com', password: 'password123' };

      // Mockez la méthode findOne() du modèle User
      UserController.User.findOne.mockReturnValue(Promise.resolve(user));

      const token = jwt.sign({ userId: '123' }, process.env.JWT_SECRET, { expiresIn: '1h' });

      const res = await request(app).post('/api/users/login').send(user);

      expect(res.status).toBe(200);
      expect(res.body.token).toBe(token);
    });
  });
});
