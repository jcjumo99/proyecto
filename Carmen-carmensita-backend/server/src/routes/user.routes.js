const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user.controllers');

router.post('/api/user/signup', userControllers.signup);
router.post('/api/user/signin', userControllers.signin);
router.post('/api/user/create', userControllers.createUser);
router.get('/api/user/list', userControllers.getUsers);
router.get('/api/user/:userId', userControllers.getUser);
router.put('/api/user/update', userControllers.updateUser);
router.get('/api/user/ordenes/:userId', userControllers.ordenClient);
router.get('/api/user/delete/:userId', userControllers.deleteUser);

module.exports = router;