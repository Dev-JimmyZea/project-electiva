'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    idProduct: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    value: {
        type: Number,
        trim: true,
        required: true
    },
    stock: {
        type: Number,
        trim: true,
        required: true
    },
    dateExpired: {
        type: Date,
        trim: true,
        required: true,
    },
    iva: {
        type: Number,
        trim: true,
    },
    typeProduct: {
        type: String,
        trim: true,
        enum: [
            'VIVERES',
            'LICORES',
            'MEDICINAS',
            'ASEO'
        ],    
        required: true
    },
    provider: {
        type: Schema.Types.ObjectId,
        ref: 'provider',
        required: true
    }
    
});


const product = module.exports = mongoose.model('product', productSchema);
product.STOCK_MIN = 5;