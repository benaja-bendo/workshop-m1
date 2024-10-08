const request = require('supertest');
const express = require('express');
const app = express();
const UserController = require('../controllers/userController');
const User = require('../models/User');

describe('UserController', () => {
  let controller;

  beforeEach(() => {
    // Initialisez le contrôleur avec les dépendances nécessaires
    controller = new UserController();

    // Configurez Express pour utiliser le contrôleur
    app.use('/api/users', (req, res, next) => {
      req.controller = controller;
      next();
    });
  });

  describe('getAllUsers', () => {
    beforeEach(async () => {
      await User.deleteMany({});
      const mockUsers = [
        { firstName: 'Test1', lastName: 'User1', email: 'test1@example.com', username:'username1', password: 'hashedPassword1', },
        { firstName: 'Test2', lastName: 'User2', email: 'test2@example.com', username:'username2', password: 'hashedPassword2', }
      ];

      await User.insertMany(mockUsers);
    });

    it('should return all users', async () => {
      const res = await request(app).get('/api/users');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body[0].firstName).toBe('Test1');
      expect(res.body[1].firstName).toBe('Test2');
    });
  });

  describe('getUserById', () => {
    beforeEach(async () => {
      await User.deleteMany({});
      const mockUser = {
        firstName: 'TestUser',
        lastName: 'Lastname',
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'hashedPassword',
        weight: 70,
        height: 180,
        gender: 'male',
        dietaryRegime: 'vegetarian',
        undesirableIngredients: ['gluten'],
        goals: ['weightLoss'],
        birthday: new Date('1990-01-01')
      };

      await User.create(mockUser);
    });

    it('should return a user by ID', async () => {
      const userId = (await User.findOne())._id.toString();

      const res = await request(app).get(`/api/users/${userId}`);

      expect(res.status).toBe(200);
      expect(res.body.firstName).toBe('TestUser');
      expect(res.body.lastName).toBe('Lastname');
      expect(res.body.email).toBe('testuser@example.com');
      // Vérifiez d'autres champs si nécessaire
    });

    it('should return 404 if user not found', async () => {
      const res = await request(app).get('/api/users/invalid-id');

      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Utilisateur non trouvé');
    });
  });

  describe('createUser', () => {
    beforeEach(async () => {
      await User.deleteMany({});
    });

    it('should create a new user', async () => {
      const newUser = {
        firstName: 'NewTest',
        lastName: 'NewLastname',
        username: 'newtestuser',
        email: 'newtestuser@example.com',
        password: 'password123',
        weight: 75,
        height: 175,
        gender: 'female',
        dietaryRegime: 'vegan',
        undesirableIngredients: ['dairy'],
        goals: ['muscleGain'],
        birthday: new Date('1995-06-15')
      };

      const res = await request(app)
        .post('/api/users')
        .send(newUser);

      expect(res.status).toBe(201);
      expect(res.body.firstName).toBe('NewTest');
      expect(res.body.lastName).toBe('NewLastname');
      expect(res.body.email).toBe('newtestuser@example.com');
      // Vérifiez d'autres champs si nécessaire
      // Note : Le mot de passe ne sera pas retourné pour des raisons de sécurité
    });

    it('should return 400 if validation fails', async () => {
      const invalidUser = {
        firstName: 'Invalid',
        lastName: '',
        email: 'invalid@example.com',
        password: 'short'
      };

      const res = await request(app)
        .post('/api/users')
        .send(invalidUser);

      expect(res.status).toBe(400);
      expect(res.body.message).toBeDefined(); // Message spécifique peut varier selon la validation
    });
  });

  describe('updateUser', () => {
    beforeEach(async () => {
      await User.deleteMany({});
      const mockUser = {
        firstName: 'TestUpdate',
        lastName: 'Lastname',
        username: 'testupdate',
        email: 'testupdate@example.com',
        password: 'hashedPassword',
        weight: 70,
        height: 180,
        gender: 'male',
        dietaryRegime: 'vegetarian',
        undesirableIngredients: ['gluten'],
        goals: ['weightLoss'],
        birthday: new Date('1990-01-01')
      };

      await User.create(mockUser);
    });

    it('should update a user', async () => {
      const userId = (await User.findOne())._id.toString();
      const updateUser = {
        firstName: 'UpdatedTest',
        lastName: 'UpdatedLastname',
        weight: 72,
        height: '182cm'
      };

      const res = await request(app)
        .put(`/api/users/${userId}`)
        .send(updateUser);

      expect(res.status).toBe(200);
      expect(res.body.firstName).toBe('UpdatedTest');
      expect(res.body.lastName).toBe('UpdatedLastname');
      expect(res.body.weight).toBe(72);
      expect(res.body.height).toBe('182cm');
    });

    it('should return 404 if user not found', async () => {
      const res = await request(app).put('/api/users/invalid-id').send({});

      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Utilisateur non trouvé');
    });
  });

  describe('deleteUser', () => {
    beforeEach(async () => {
      await User.deleteMany({});
      const mockUser = {
        firstName: 'TestDelete',
        lastName: 'Lastname',
        username: 'testdelete',
        email: 'testdelete@example.com',
        password: 'hashedPassword',
        weight: 70,
        height: 180,
        gender: 'male',
        dietaryRegime: 'vegetarian',
        undesirableIngredients: ['gluten'],
        goals: ['weightLoss'],
        birthday: new Date('1990-01-01')
      };

      await User.create(mockUser);
    });

    it('should delete a user', async () => {
      const userId = (await User.findOne())._id.toString();

      const res = await request(app).delete(`/api/users/${userId}`);

      expect(res.status).toBe(204);
    });

    it('should return 404 if user not found', async () => {
      const res = await request(app).delete('/api/users/invalid-id');

      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Utilisateur non trouvé');
    });
  });

  describe('login', () => {
    beforeEach(async () => {
      await User.deleteMany({});
      const mockUser = {
        firstName: 'TestLogin',
        lastName: 'Lastname',
        username: 'testlogin',
        email: 'testlogin@example.com',
        password: 'hashedPassword',
        weight: 70,
        height: 180,
        gender: 'male',
        dietaryRegime: 'vegetarian',
        undesirableIngredients: ['gluten'],
        goals: ['weightLoss'],
        birthday: new Date('1990-01-01')
      };

      await User.create(mockUser);
    });

    it('should login a user', async () => {
      const loginUser = { email: 'testlogin@example.com', password: 'hashedPassword' };

      const res = await request(app)
        .post('/api/users/login')
        .send(loginUser);

      expect(res.status).toBe(200);
      expect(res.body.token).toBeDefined(); // Le token sera généré dynamiquement
    });

    it('should return 401 if credentials are invalid', async () => {
      const loginUser = { email: 'invalid@example.com', password: 'wrongpassword' };

      const res = await request(app)
        .post('/api/users/login')
        .send(loginUser);

      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Credenciaux incorrects');
    });
  });
});
