'use strict';

const { Router } = require('express');
const router = Router();
const { getProducts, getProduct, createProduct, replaceProduct, updateProduct, deleteProduct, isExpired, calcIva } = require('../controllers/products');

router.get('/', getProducts);
router.get('/:idProduct', getProduct);
router.get('/expired/:idProduct', isExpired);
router.get('/iva/:idProduct', calcIva);
router.post('/:provider', createProduct);
router.put('/:id', replaceProduct);
router.patch('/:id', updateProduct);
router.delete('/:idProduct', deleteProduct);

module.exports = router;