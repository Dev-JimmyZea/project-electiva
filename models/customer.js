'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerSchema = new Schema({
    idCustomer: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },    
    address: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    bills: [{
        type: Schema.Types.ObjectId,
        ref: 'bill'
    }]

});

module.exports = mongoose.model('customer', customerSchema);