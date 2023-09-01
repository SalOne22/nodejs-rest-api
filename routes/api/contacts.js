const express = require('express');

const contactController = require('../../controllers/contact-controllers');

const router = express.Router();

router.get('/', contactController.getAll);

router.get('/:contactId', contactController.getById);

router.post('/', contactController.add);

router.delete('/:contactId', contactController.remove);

router.put('/:contactId', contactController.update);

module.exports = router;
