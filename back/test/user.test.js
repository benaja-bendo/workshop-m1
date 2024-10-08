const request = require('supertest');
const app = require('../server');
const User = require('../models/User');
const bcrypt = require('bcrypt');

describe('User API', () => {
  let userToken;

  beforeEach(async () => {
    const passwordHash = await bcrypt.hash('password123', 10);
    const user = new User({
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'johndoe@example.com',
      password: passwordHash
    });
    await user.save();
  });

  it('should create a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        firstName: 'Jane',
        lastName: 'Doe',
        username: 'janedoe',
        email: 'janedoe@example.com',
        password: 'password123'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('firstName', 'Jane');
    expect(response.body).toHaveProperty('lastName', 'Doe');
    expect(response.body).toHaveProperty('username', 'janedoe');
    expect(response.body).not.toHaveProperty('password');
  });

  it('should not create a user with an existing email', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        firstName: 'Duplicate',
        lastName: 'User',
        username: 'duplicateuser',
        email: 'johndoe@example.com',
        password: 'password123'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBeDefined();
  });

  it('should log in a user and return a token', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: 'johndoe@example.com',
        password: 'password123'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    userToken = response.body.token;
  });

  it('should get a user by ID', async () => {
    const user = await User.findOne({ email: 'johndoe@example.com' });
    const response = await request(app)
      .get(`/api/users/${user._id}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('firstName', 'John');
    expect(response.body).toHaveProperty('lastName', 'Doe');
    expect(response.body).not.toHaveProperty('password');
  });

  it('should update a user', async () => {
    const user = await User.findOne({ email: 'johndoe@example.com' });
    const response = await request(app)
      .put(`/api/users/${user._id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        firstName: 'John',
        lastName: 'Smith'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('lastName', 'Smith');
  });

  it('should delete a user', async () => {
    const user = await User.findOne({ email: 'johndoe@example.com' });
    const response = await request(app)
      .delete(`/api/users/${user._id}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.statusCode).toBe(204);

    const deletedUser = await User.findById(user._id);
    expect(deletedUser).toBeNull();
  });
});
