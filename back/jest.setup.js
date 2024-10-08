// jest.setup.js
const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost/test-db');
});

afterAll(async () => {
  await mongoose.disconnect();
});
