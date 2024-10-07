const express = require('express');
const router = express.Router();
const ExampleController = require('../controllers/exampleController');

const controller = new ExampleController();

router.get('/', controller.getAll);
router.post('/', controller.create);

module.exports = router;
