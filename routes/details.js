'use strict';

const express = require('express');
const router = express.Router();
const { getDetails, getDetail, createDetail, replaceDetail, updateDetail, deleteDetail, calcSubtotal } = require('../controllers/details');

router.get('/', getDetails);
router.get('/:code', getDetail);
router.get('/subtotal/:code', calcSubtotal);
router.post('/:idProduct', createDetail);
router.put('/:id', replaceDetail);
router.patch('/:id', updateDetail);
router.delete('/:code', deleteDetail);


module.exports = router;