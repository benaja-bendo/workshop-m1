// ingredient.test.js

const request = require('supertest');
const app = require('../server'); // Assurez-vous d'avoir ce fichier dans votre projet
const Ingredient = require('../models/Ingredient');

describe('Ingredient API', () => {
  beforeEach(async () => {
    await Ingredient.deleteMany({ testCreated: true }); // Supprime uniquement les ingrédients créés pour les tests
  });

  describe('GET /api/ingredients', () => {
    it('should return all ingredients', async () => {
      const ingredient1 = new Ingredient({
        name: 'Tomate',
        type: 'fruit',
        quantityType: 'g',
        quantity: 200,
        calories: 20,
        proteins: 1,
        sugars: 4,
        salt: 0.1,
        restrictions: ['allergie'],
        testCreated: true
      });
      await ingredient1.save();

      const ingredient2 = new Ingredient({
        name: 'Oignon',
        type: 'vegetable',
        quantityType: 'g',
        quantity: 150,
        calories: 40,
        proteins: 1.5,
        sugars: 8,
        salt: 0.05,
        restrictions: [],
        testCreated: true
      });
      await ingredient2.save();

      const response = await request(app).get('/api/ingredients');

      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body[0].name).toBe('Tomate');
      expect(response.body[1].name).toBe('Oignon');
    });
  });

  describe('GET /api/ingredients/:id', () => {
    it('should return a single ingredient', async () => {
      const ingredient = new Ingredient({
        name: 'Carotte',
        type: 'vegetable',
        quantityType: 'g',
        quantity: 250,
        calories: 45,
        proteins: 1.2,
        sugars: 9,
        salt: 0.08,
        restrictions: ['diabète'],
        testCreated: true
      });
      await ingredient.save();

      const response = await request(app).get(`/api/ingredients/${ingredient._id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.name).toBe('Carotte');
      expect(response.body.type).toBe('vegetable');
    });

    it('should return 500 for non-existent ingredient', async () => {
      const response = await request(app).get('/api/ingredients/invalid-id');

      expect(response.statusCode).toBe(500);
      expect(response.body.message).toBeDefined();
    });
  });

  describe('POST /api/ingredients', () => {
    it('should create a new ingredient', async () => {
      const response = await request(app)
        .post('/api/ingredients')
        .send({
          name: 'Poivron',
          type: 'vegetable',
          quantityType: 'g',
          quantity: 180,
          calories: 30,
          proteins: 1.1,
          sugars: 6,
          salt: 0.06,
          restrictions: [],
          testCreated: true
        });

      expect(response.statusCode).toBe(201);
      expect(response.body.name).toBe('Poivron');
      expect(response.body.type).toBe('vegetable');
      expect(response.body.quantity).toBe(180);
    });

    it('should not create an ingredient with missing fields', async () => {
      const response = await request(app)
        .post('/api/ingredients')
        .send({
          name: 'Missing Fields',
          type: 'vegetable'
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBeDefined();
    });
  });

  describe('PUT /api/ingredients/:id', () => {
    it('should update an existing ingredient', async () => {
      const ingredient = new Ingredient({
        name: 'Pomme de terre',
        type: 'other',
        quantityType: 'g',
        quantity: 220,
        calories: 70,
        proteins: 2,
        sugars: 15,
        salt: 0.02,
        restrictions: ['diabète'],
        testCreated: true
      });
      await ingredient.save();

      const updatedIngredient = {
        name: 'Pomme de terre ronde',
        type: 'other',
        quantityType: 'g',
        quantity: 230,
        calories: 75,
        proteins: 2.1,
        sugars: 16,
        salt: 0.03,
        restrictions: ['diabète'],
        testCreated: true
      };

      const response = await request(app)
        .put(`/api/ingredients/${ingredient._id}`)
        .send(updatedIngredient);

      expect(response.statusCode).toBe(200);
      expect(response.body.name).toBe('Pomme de terre ronde');
      expect(response.body.quantity).toBe(230);
    });

    it('should return 500 for non-existent ingredient', async () => {
      const response = await request(app).put('/api/ingredients/invalid-id');

      expect(response.statusCode).toBe(500);
      expect(response.body.message).toBeDefined();
    });
  });

  describe('DELETE /api/ingredients/:id', () => {
    it('should delete an existing ingredient', async () => {
      const ingredient = new Ingredient({
        name: 'Épinard',
        type: 'vegetable',
        quantityType: 'g',
        quantity: 100,
        calories: 20,
        proteins: 3,
        sugars: 1,
        salt: 0.05,
        restrictions: [],
        testCreated: true
      });
      await ingredient.save();

      const response = await request(app).delete(`/api/ingredients/${ingredient._id}`);

      expect(response.statusCode).toBe(204);
    });

    it('should return 500 for non-existent ingredient', async () => {
      const response = await request(app).delete('/api/ingredients/invalid-id');

      expect(response.statusCode).toBe(500);
      expect(response.body.message).toBeDefined();
    });
  });
});
