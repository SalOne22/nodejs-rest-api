const express = require('express');

const userController = require('../controllers/users');

const { validateToken } = require('../middlewares');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', validateToken, userController.logout);
router.post('/current', validateToken, userController.current);

module.exports = router;
