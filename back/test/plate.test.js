// plate.test.js

const request = require('supertest');
const app = require('../server'); // Assurez-vous d'avoir ce fichier dans votre projet
const Plate = require('../models/Plate');
const Ingredient = require('../models/Ingredient');

describe('Plate API', () => {
  beforeEach(async () => {
    await Plate.deleteMany({});
    await Ingredient.deleteMany({});
  });

  const createIngredient = async (ingredientData) => {
    const ingredient = new Ingredient(ingredientData);
    await ingredient.save();
    return ingredient;
  };

  // Ajout d'une console log avant chaque test pour le diagnostic
  beforeAll(() => {
    console.log("Starting Plate API tests");
  });

  describe('GET /api/plates', () => {
    it('should return all plates', async () => {
      const ingredient1 = await createIngredient({
        name: 'Tomate',
        type: 'fruit',
        quantityType: 'g',
        quantity: 200,
        calories: 20,
        proteins: 1,
        sugars: 4,
        salt: 0.1,
        restrictions: ['allergie']
      });

      const plate1 = new Plate({
        name: 'Salade',
        type: 'starter',
        season: 'été',
        ingredients: [ingredient1._id],
        recipe: 'Mélanger les ingrédients.'
      });
      await plate1.save();

      const response = await request(app).get('/api/plates');
      console.log("GET /api/plates response:", response.body); // Log de la réponse pour le diagnostic

      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].name).toBe('Salade');
    });
  });

  describe('GET /api/plates/:id', () => {
    it('should return a single plate', async () => {
      const ingredient = await createIngredient({
        name: 'Carotte',
        type: 'vegetable',
        quantityType: 'g',
        quantity: 100,
        calories: 40,
        proteins: 1,
        sugars: 5,
        salt: 0.01,
        restrictions: []
      });

      const plate = new Plate({
        name: 'Soupe',
        type: 'starter',
        season: 'hiver',
        ingredients: [ingredient._id],
        recipe: 'Faire bouillir les ingrédients.'
      });
      await plate.save();

      const response = await request(app).get(`/api/plates/${plate._id}`);
      console.log("GET /api/plates/:id response:", response.body); // Log de la réponse pour le diagnostic

      expect(response.statusCode).toBe(200);
      expect(response.body.name).toBe('Soupe');
      expect(response.body.ingredients.length).toBe(1);
    });

    it('should return 404 for non-existent plate', async () => {
      const response = await request(app).get('/api/plates/invalid-id');
      console.log("GET /api/plates/invalid-id response:", response.body); // Log de la réponse pour le diagnostic

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBeDefined();
    });
  });

  describe('POST /api/plates', () => {
    it('should create a new plate', async () => {
      const ingredient = await createIngredient({
        name: 'Poivron',
        type: 'vegetable',
        quantityType: 'g',
        quantity: 150,
        calories: 30,
        proteins: 1.2,
        sugars: 5,
        salt: 0.02,
        restrictions: []
      });

      const response = await request(app)
        .post('/api/plates')
        .send({
          name: 'Ragoût',
          type: 'main course',
          season: 'automne',
          ingredients: [ingredient._id],
          recipe: 'Cuire à feu doux.'
        });

      console.log("POST /api/plates response:", response.body); // Log de la réponse pour le diagnostic

      expect(response.statusCode).toBe(201);
      expect(response.body.name).toBe('Ragoût');
    });

    it('should not create a plate with invalid ingredients', async () => {
      const response = await request(app)
        .post('/api/plates')
        .send({
          name: 'Invalid Plate',
          type: 'main course',
          season: 'automne',
          ingredients: ['invalid-id'], // Invalid ID
          recipe: 'Ce plat est invalide.'
        });

      console.log("POST /api/plates invalid ingredients response:", response.body); // Log de la réponse pour le diagnostic

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBeDefined();
    });
  });

  describe('PUT /api/plates/:id', () => {
    it('should update an existing plate', async () => {
      const ingredient = await createIngredient({
        name: 'Épinard',
        type: 'vegetable',
        quantityType: 'g',
        quantity: 100,
        calories: 20,
        proteins: 3,
        sugars: 1,
        salt: 0.05,
        restrictions: []
      });

      const plate = new Plate({
        name: 'Lasagne',
        type: 'main course',
        season: 'hiver',
        ingredients: [ingredient._id],
        recipe: 'Assemblez et cuisez.'
      });
      await plate.save();

      const updatedPlate = {
        name: 'Lasagne Végétarienne',
        type: 'main course',
        season: 'hiver',
        ingredients: [ingredient._id],
        recipe: 'Assemblez et cuisez avec des légumes.'
      };

      const response = await request(app)
        .put(`/api/plates/${plate._id}`)
        .send(updatedPlate);

      console.log("PUT /api/plates/:id response:", response.body); // Log de la réponse pour le diagnostic

      expect(response.statusCode).toBe(200);
      expect(response.body.name).toBe('Lasagne Végétarienne');
    });

    it('should return 400 for invalid plate ID', async () => {
      const response = await request(app).put('/api/plates/invalid-id').send({
        name: 'Updated Plate',
        type: 'main course',
        season: 'winter',
        ingredients: [],
        recipe: 'Some recipe'
      });

      console.log("PUT /api/plates/invalid-id response:", response.body); // Ajoutez ce log pour voir la réponse

      expect(response.statusCode).toBe(400); // Vérifiez que le code d'état est 400
      expect(response.body.message).toBe('Invalid plate ID'); // Vérifiez que le message est correct
    });
  });

  describe('DELETE /api/plates/:id', () => {
    it('should delete an existing plate', async () => {
      const ingredient = await createIngredient({
        name: 'Brocoli',
        type: 'vegetable',
        quantityType: 'g',
        quantity: 200,
        calories: 30,
        proteins: 3,
        sugars: 2,
        salt: 0.01,
        restrictions: []
      });

      const plate = new Plate({
        name: 'Gratin',
        type: 'main course',
        season: 'hiver',
        ingredients: [ingredient._id],
        recipe: 'Cuire au four.'
      });
      await plate.save();

      const response = await request(app).delete(`/api/plates/${plate._id}`);
      console.log("DELETE /api/plates/:id response:", response.body); // Log de la réponse pour le diagnostic

      expect(response.statusCode).toBe(204);
    });

    it('should return 400 for invalid plate ID', async () => {
      const response = await request(app).delete('/api/plates/invalid-id');

      console.log("DELETE /api/plates/invalid-id response:", response.body); // Ajoutez ce log pour voir la réponse

      expect(response.statusCode).toBe(400); // Vérifiez que le code d'état est 400
      expect(response.body.message).toBe('Invalid plate ID'); // Vérifiez que le message est correct
    });
  });
});
