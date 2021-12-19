'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DetailSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true        
    },

    cant: {
        type: Number,
        required: true
    },

    product: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },    

    subtotal: {
        type: Number,
        default: 0    
    },    

});


module.exports = mongoose.model('detail', DetailSchema);