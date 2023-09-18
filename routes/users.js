const express = require('express');

const userController = require('../controllers/users');

const { authorize } = require('../middlewares');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', authorize, userController.logout);
router.get('/current', authorize, userController.current);
router.patch('/', authorize, userController.updateSubscription);

module.exports = router;
