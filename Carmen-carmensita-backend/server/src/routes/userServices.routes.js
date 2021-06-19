const express = require('express');
const router = express.Router();
const userServicesControllers = require('../controllers/userServices.controllers');

router.post('/api/userServices/add', userServicesControllers.addUserServices);
router.get('/api/userServices/getList', userServicesControllers.getUserServices);
router.put('/api/userServices/update', userServicesControllers.updateState);
router.post('/api/userServices/getCode', userServicesControllers.getServicesCode);

module.exports = router;