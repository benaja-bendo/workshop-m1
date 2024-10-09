// plate.test.js

const request = require('supertest');
const app = require('../server'); // Assurez-vous d'avoir ce fichier dans votre projet
const Recipe = require('../models/Recipe');

describe('Recipe API', () => {
  beforeEach(async () => {
    await Recipe.deleteMany({});
  });

  // Ajout d'un console log avant chaque test pour le diagnostic
  beforeAll(() => {
    console.log("Starting Recipe API tests");
  });

  describe('GET /api/recipes', () => {
    it('should return all recipes', async () => {
      const recipe1 = new Recipe({
        id: '1',
        recipeId: 'abc123',
        recipeName: 'Salade',
        totalTimeMinutes: 10,
        servings: 2,
        ingredients: {
          'Tomato': '2 pieces',
          'Cucumber': '1 piece'
        },
        directions: 'Mélanger les ingrédients.',
        rating: 4.5,
        diet: ['vegetarian'],
        tags: ['été', 'frais']
      });
      await recipe1.save();

      const response = await request(app).get('/api/recipes');
      console.log("GET /api/recipes response:", response.body); // Log de la réponse pour le diagnostic

      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].recipeName).toBe('Salade');
    });
  });

  describe('GET /api/recipes/:id', () => {
    it('should return a single recipe', async () => {
      const recipe = new Recipe({
        id: '2',
        recipeId: 'def456',
        recipeName: 'Soupe',
        totalTimeMinutes: 30,
        servings: 4,
        ingredients: {
          'Carrot': '3 pieces',
          'Water': '500 ml'
        },
        directions: 'Faire bouillir les ingrédients.',
        rating: 5,
        diet: ['vegan'],
        tags: ['hiver', 'réconfort']
      });
      await recipe.save();

      const response = await request(app).get(`/api/recipes/${recipe._id}`);
      console.log("GET /api/recipes/:id response:", response.body); // Log de la réponse pour le diagnostic

      expect(response.statusCode).toBe(200);
      expect(response.body.recipeName).toBe('Soupe');
      expect(response.body.ingredients).toHaveProperty('Carrot', '3 pieces');
    });

    it('should return 404 for non-existent recipe', async () => {
      const response = await request(app).get('/api/recipes/invalid-id');
      console.log("GET /api/recipes/invalid-id response:", response.body); // Log de la réponse pour le diagnostic

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('Recette non trouvée');
    });
  });

  describe('POST /api/recipes', () => {
    it('should create a new recipe', async () => {
      const response = await request(app)
        .post('/api/recipes')
        .send({
          id: '3',
          recipeId: 'ghi789',
          recipeName: 'Ragoût',
          totalTimeMinutes: 60,
          servings: 4,
          ingredients: {
            'Potato': '3 pieces',
            'Onion': '1 piece',
            'Beef': '200g'
          },
          directions: 'Cuire à feu doux.',
          rating: 4,
          diet: ['gluten-free'],
          tags: ['automne', 'confort']
        });

      console.log("POST /api/recipes response:", response.body); // Log de la réponse pour le diagnostic

      expect(response.statusCode).toBe(201);
      expect(response.body.recipeName).toBe('Ragoût');
    });

    it('should not create a recipe with invalid data', async () => {
      const response = await request(app)
        .post('/api/recipes')
        .send({
          id: '4',
          recipeId: 'invalid', // Invalid recipeId length
          recipeName: '',
          totalTimeMinutes: -10, // Invalid time
          servings: 'two', // Invalid servings type
          ingredients: {
            'Tomato': '3 pieces'
          },
          directions: '',
          rating: 6, // Rating out of allowed range
          diet: ['invalid-diet'], // Invalid diet value
          tags: []
        });

      console.log("POST /api/recipes invalid data response:", response.body); // Log de la réponse pour le diagnostic

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBeDefined();
    });
  });

  describe('PUT /api/recipes/:id', () => {
    it('should update an existing recipe', async () => {
      const recipe = new Recipe({
        id: '5',
        recipeId: 'jkl012',
        recipeName: 'Lasagne',
        totalTimeMinutes: 120,
        servings: 6,
        ingredients: {
          'Pasta': '12 sheets',
          'Cheese': '200g'
        },
        directions: 'Assemblez et cuisez.',
        rating: 4.5,
        diet: ['vegetarian'],
        tags: ['hiver', 'italien']
      });
      await recipe.save();

      const updatedRecipe = {
        recipeName: 'Lasagne Végétarienne',
        totalTimeMinutes: 110,
        servings: 6,
        ingredients: {
          'Pasta': '12 sheets',
          'Cheese': '200g',
          'Spinach': '100g'
        },
        directions: 'Assemblez et cuisez avec des légumes.',
        rating: 5,
        diet: ['vegan'],
        tags: ['hiver', 'italien']
      };

      const response = await request(app)
        .put(`/api/recipes/${recipe._id}`)
        .send(updatedRecipe);

      console.log("PUT /api/recipes/:id response:", response.body); // Log de la réponse pour le diagnostic

      expect(response.statusCode).toBe(200);
      expect(response.body.recipeName).toBe('Lasagne Végétarienne');
    });

    it('should return 400 for invalid recipe ID', async () => {
      const response = await request(app).put('/api/recipes/invalid-id').send({
        recipeName: 'Updated Recipe',
        totalTimeMinutes: 30,
        servings: 2,
        ingredients: {
          'Salt': '1 tsp'
        },
        directions: 'Some recipe'
      });

      console.log("PUT /api/recipes/invalid-id response:", response.body); // Ajoutez ce log pour voir la réponse

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('ID de recette invalide');
    });
  });

  describe('DELETE /api/recipes/:id', () => {
    it('should delete an existing recipe', async () => {
      const recipe = new Recipe({
        id: '6',
        recipeId: 'mno345',
        recipeName: 'Gratin',
        totalTimeMinutes: 60,
        servings: 4,
        ingredients: {
          'Broccoli': '200g',
          'Cheese': '100g'
        },
        directions: 'Cuire au four.',
        rating: 4,
        diet: ['vegetarian'],
        tags: ['hiver']
      });
      await recipe.save();

      const response = await request(app).delete(`/api/recipes/${recipe._id}`);
      console.log("DELETE /api/recipes/:id response:", response.body); // Log de la réponse pour le diagnostic

      expect(response.statusCode).toBe(204);
    });

    it('should return 400 for invalid recipe ID', async () => {
      const response = await request(app).delete('/api/recipes/invalid-id');

      console.log("DELETE /api/recipes/invalid-id response:", response.body); // Ajoutez ce log pour voir la réponse

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('ID de recette invalide');
    });
  });
});
