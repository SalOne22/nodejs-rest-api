const express = require('express');

const contactController = require('../../controllers/contacts');
const { validateId, authorize } = require('../../middlewares');

const router = express.Router();

router.use(authorize);

router.get('/', contactController.getAll);

router.get('/:id', validateId, contactController.getById);

router.post('/', contactController.add);

router.delete('/:id', validateId, contactController.remove);

router.put('/:id', validateId, contactController.update);

router.patch('/:id/favorite', validateId, contactController.updateStatus);

module.exports = router;
