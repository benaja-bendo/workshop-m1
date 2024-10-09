const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongoServer;

beforeAll(async () => {
  // Crée une instance de MongoMemoryServer
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  // Déconnecte toute connexion existante
  await mongoose.disconnect();
  // Connecte Mongoose à la base de données en mémoire sans options obsolètes
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.close(); // Ferme la connexion à la fin de tous les tests
  await mongoServer.stop();
});

afterEach(async () => {
  // Nettoie toutes les collections après chaque test pour éviter les conflits
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
});
