'use strict';

const Product = require('../models/product');
const Provider = require('../models/provider');

module.exports = {
    getProducts: async (req, res) => {
        try {
            const products = await Product.find().populate('provider');
            return res.status(200).json({
                message: 'Products fetched successfully',
                data: products
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to fetch products',
                error: err
            });
        }
    },

    getProduct: async (req, res) => {
        try {
            const product = await Product.findOne({
                idProduct: req.params.idProduct
            });
            if (!product) {
                return res.status(404).json({
                    message: 'Product not found',
                });
            }
            return res.status(200).json({
                message: 'Product fetched successfully',
                data: product
            });

        } catch (err) {
            return res.status(500).json({
                message: 'Failed to fetch product',
                error: err
            });
        }
    },

    createProduct: async (req, res) => {
        try {

            const provider = await Provider.findOne({
                idProvider: req.params.provider
            });

            if (!provider) {
                return res.status(404).json({
                    message: 'Provider not found',
                });
            }            

            if (req.body.stock < Product.STOCK_MIN) {
                return res.status(400).json({
                    message: 'Stock must be greater than 5'
                });
            }

            const product = new Product(req.body);
            product.typeProduct = req.body.typeProduct !== undefined ? req.body.typeProduct.toUpperCase() : null;
            product.iva = product.value * 0.19;
            product.provider = provider;

            await product.save();

            return res.status(200).json({
                message: 'Product created successfully',
                data: product
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to create product',
                error: err
            });
        }
    },

    replaceProduct: async (req, res) => {
        try {
            const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
                new: true
            });
            if (!product) {
                return res.status(404).json({
                    message: 'Product not found',
                });
            }
            return res.status(200).json({
                message: 'Product replaced successfully',
                data: product
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to replace product',
                error: err
            });
        }
    },

    updateProduct: async (req, res) => {
        try {
            const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
                new: true
            });
            if (!product) {
                return res.status(404).json({
                    message: 'Product not found',
                });
            }
            return res.status(200).json({
                message: 'Product updated successfully',
                data: product
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to update product',
                error: err
            });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const product = await Product.findOneAndDelete({
                idProduct: req.params.idProduct
            });
            if (!product) {
                return res.status(404).json({
                    message: 'Product not found',
                });
            }
            return res.status(200).json({
                message: 'Product deleted successfully',
                data: product
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to delete product',
                error: err
            });
        }
    },


    isExpired: async (req, res) => {
        try {
            const product = await Product.findOne({
                idProduct: req.params.idProduct
            });
            if (!product) {
                return res.status(404).json({
                    message: 'Product not found',
                });
            }
            const days = Math.ceil((product.dateExpired - new Date()) / (1000 * 60 * 60 * 24));

            if (product.dateExpired < new Date().setDate(new Date().getDate() - 1)) {
                return res.status(200).json({
                    message: 'Product expired ' + Math.abs(days) + ' days ago',                    
                    data: product
                });
            }
            return res.status(200).json({
                message: 'Product will expire in ' + days + ' days',
                data: product
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to check product expiration',
                error: err
            });
        }
    },

    calcIva: async (req, res) => {
        try {
            const product = await Product.findOne({
                idProduct: req.params.idProduct
            });
            if (!product) {
                return res.status(404).json({
                    message: 'Product not found',
                });
            }
            const iva = product.value * 0.19;
            return res.status(200).json({
                message: 'Product iva calculated successfully',
                data: 'The iva of product with id ' + req.params.idProduct + ' is: $' + iva.toFixed(2)
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to calculate product iva',
                error: err
            });
        }
    },
};
