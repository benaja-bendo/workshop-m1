const express = require('express');
const router = express.Router();
const PlateController = require('../controllers/plateController');

const plateController = new PlateController();

router.get('/', plateController.getAllPlates);
router.get('/:id', plateController.getPlateById);
router.post('/', plateController.createPlate);
router.put('/:id', plateController.updatePlate);
router.delete('/:id', plateController.deletePlate);

module.exports = router;
