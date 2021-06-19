const express = require('express');
const router = express.Router();
const servicesControllers = require('../controllers/services.controllers');

router.post('/api/services/create', servicesControllers.create);
router.get('/api/services/list', servicesControllers.list);
router.get('/api/services/:servicesId', servicesControllers.getId);
router.post('/api/services/update', servicesControllers.update);
router.post('/api/services/updateImage', servicesControllers.updateImageServices);
router.get('/api/services/delete/:servicesId', servicesControllers.delete);

module.exports = router;