'use strict';

const { Router } = require('express');
const router = Router();
const { getCustomers, getCustomer, createCustomer, replaceCustomer, updateCustomer, deleteCustomer } = require('../controllers/customers');

router.get('/', getCustomers);
router.get('/:idCustomer', getCustomer);
router.post('/', createCustomer);
router.put('/:id', replaceCustomer);
router.patch('/:id', updateCustomer);
router.delete('/:idCustomer', deleteCustomer);

module.exports = router;