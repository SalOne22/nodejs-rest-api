const express = require('express');

const contactController = require('../../controllers/contact-controllers');
const { validateId } = require('../../middlewares');

const router = express.Router();

router.get('/', contactController.getAll);

router.get('/:id', validateId, contactController.getById);

router.post('/', contactController.add);

router.delete('/:id', validateId, contactController.remove);

router.put('/:id', validateId, contactController.update);

module.exports = router;
