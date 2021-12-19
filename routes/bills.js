'use strict';

const express = require('express');
const router = express.Router();

const {getBills, getBill, createBill, replaceBill, updateBill, deleteBill, addDetail, getDetails, calcTotal} = require('../controllers/bills');

router.get('/', getBills);
router.get('/:number', getBill);
router.get('/details/:number', getDetails);
router.get('/total/:number', calcTotal);
router.post('/:customer', createBill);
router.post('/:number/:codeDetail', addDetail);
router.put('/:id', replaceBill);
router.patch('/:id', updateBill);
router.delete('/:number', deleteBill);


module.exports = router;
