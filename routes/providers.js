'use strict';

const { Router } = require('express');
const router = Router();
const { getProviders, getProvider, createProvider, replaceProvider, updateProvider, deleteProvider } = require('../controllers/providers');

router.get('/', getProviders);
router.get('/:idProvider', getProvider);
router.post('/', createProvider);
router.put('/:id', replaceProvider);
router.patch('/:id', updateProvider);
router.delete('/:idProvider', deleteProvider);

module.exports = router;