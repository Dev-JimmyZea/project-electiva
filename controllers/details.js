'use strict';   

const Detail = require('../models/detail');
const Product = require('../models/product');

module.exports = {
    getDetails: async (req, res) => {
        try {
            const details = await Detail.find().populate('product');
            return res.status(200).json({
                message: 'Details fetched successfully',
                data: details
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to fetch details',
                error: err
            });
        }
    },

    getDetail: async (req, res) => {
        try {
            const detail = await Detail.findOne({
                code: req.params.code
            }).populate('product');
            if (!detail) {
                return res.status(404).json({
                    message: 'Detail not found',
                });
            }
            return res.status(200).json({
                message: 'Detail fetched successfully',
                data: detail
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to fetch detail',
                error: err
            });
        }
    },

    createDetail: async (req, res) => {
        try {
            const product = await Product.findOne({
                idProduct: req.params.idProduct
            });

            if(!product) {
                return res.status(404).json({
                    message: 'Product not found'
                });
            }

            if(product.stock-req.body.cant < Product.STOCK_MIN) {
                return res.status(400).json({
                    message: 'Quantity exceeds minimum stock'
                });
            }

            const detail = new Detail(req.body);
            detail.product = product;
            detail.subtotal = (product.value * detail.cant) + (product.iva * detail.cant);
            product.stock -= detail.cant;
            await detail.save();
            await product.save();
            return res.status(200).json({
                message: 'Detail created successfully',
                data: detail
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to create detail',
                error: err
            });
        }
    },

    replaceDetail: async (req, res) => {
        try {
            const detail = await Detail.findByIdAndUpdate(req.params.id, req.body, {
                new: true
            });
            if (!detail) {
                return res.status(404).json({
                    message: 'Detail not found'
                });
            }
            return res.status(200).json({
                message: 'Detail replaced successfully',
                data: detail
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to replace detail',
                error: err
            });
        }
    },
    
    updateDetail: async (req, res) => {
        try {
            const detail = await Detail.findByIdAndUpdate(req.params.id, req.body, {
                new: true
            });
            if (!detail) {
                return res.status(404).json({
                    message: 'Detail not found'
                });
            }
            return res.status(200).json({
                message: 'Detail updated successfully',
                data: detail
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to update detail',
                error: err
            });
        }
    },

    deleteDetail: async (req, res) => {
        try {
            const detail = await Detail.findOneAndDelete({
                code: req.params.code
            });
            if (!detail) {
                return res.status(404).json({
                    message: 'Detail not found'
                });
            }
            const product = await Product.findById(detail.product);
            product.stock += detail.cant;
            await product.save();
            return res.status(200).json({
                message: 'Detail deleted successfully',
                data: detail
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to delete detail',
                error: err
            });
        }
    },

    calcSubtotal: async (req, res) => {
        try {
            const detail = await Detail.findOne({
                code: req.params.code
            });
                     
            if (!detail) {
                return res.status(404).json({
                    message: 'Detail not found'
                });
            }
            const product = await Product.findById(detail.product);
            const subtotal = (product.value * detail.cant) + (product.iva * detail.cant);
            detail.subtotal = subtotal;
            return res.status(200).json({
                message: 'Subtotal calculated successfully',
                data: 'El subtotal del detalle con id '+req.params.code+' es: $'+subtotal.toFixed(2)
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to calculate subtotal',
                error: err
            });
        }
    }
};



