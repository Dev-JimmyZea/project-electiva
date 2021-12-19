'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billSchema = new Schema({
    number: {
        type: String,
        required: true,
        unique: true
    },
    dateBill: {
        type: Date,
        required: true
    },
    isPaid: {
        type: Boolean,
        required: true
    },
    details: [{
        type: Schema.Types.ObjectId,
        ref: 'detail'
    }],
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'customer',
        required: true
    }

});


module.exports = mongoose.model('bill', billSchema);