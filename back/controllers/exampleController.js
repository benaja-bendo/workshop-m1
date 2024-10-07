class ExampleController {
  async getAll(req, res) {
    // Logique pour récupérer tous les exemples
    res.json({ message: 'Tous les exemples' });
  }

  async create(req, res) {
    // Logique pour créer un nouvel exemple
    res.json({ message: 'Exemple créé' });
  }
}

module.exports = ExampleController;
