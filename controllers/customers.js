'use strict';

const Customer = require('../models/customer');
const Bill = require('../models/bill');
const Detail = require('../models/detail');
const Product = require('../models/product');

module.exports = {
    getCustomers: async (req, res) => {
        try {
            const customers = await Customer.find();
            return res.status(200).json({
                message: 'Customers fetched successfully',
                data: customers
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to fetch customers',
                error: err
            });
        }
    },

    getCustomer: async (req, res) => {
        try {
            const customer = await Customer.findOne({
                idCustomer: req.params.idCustomer
            });
            if (!customer) {
                return res.status(404).json({
                    message: 'Customer not found',
                });
            }
            return res.status(200).json({
                message: 'Customer fetched successfully',
                data: customer
            });

        } catch (err) {
            return res.status(500).json({
                message: 'Failed to fetch customer',
                error: err
            });
        }
    },

    createCustomer: async (req, res) => {
        try {
            const customer = new Customer(req.body);
            await customer.save();
            return res.status(201).json({
                message: 'Customer created successfully',
                customer: customer
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to create customer',
                error: err
            });
        }
    },

    replaceCustomer: async (req, res) => {
        try {
            const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });
            if (!customer) {
                return res.status(404).json({
                    message: 'Customer not found',
                });
            }
            return res.status(200).json({
                message: 'Customer replaced successfully',
                data: customer
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to replace customer',
                error: err
            });
        }
    },

    updateCustomer: async (req, res) => {
        try {
            const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });
            if (!customer) {
                return res.status(404).json({
                    message: 'Customer not found',
                });
            }
            return res.status(200).json({
                message: 'Customer updated successfully',
                data: customer
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to update customer',
                error: err
            });
        }
    },

    deleteCustomer: async (req, res) => {
        try {
            const customer = await Customer.findOne({
                idCustomer: req.params.idCustomer
            }).populate('bills');

            if (!customer) {
                return res.status(404).json({
                    message: 'Customer not found',
                });
            }

            customer.bills.forEach(async (bill) => {
                bill.details.forEach(async (detail) => {

                    console.log(detail._id);
                    const details = await Detail.findById(detail._id);
                    console.log(details)
                    console.log(details.product);
                    await Product.findByIdAndUpdate(details.product, {
                        $inc: {
                            stock: details.cant
                        }
                    });

                    await Detail.findByIdAndDelete(detail._id);
                });
                await Bill.findByIdAndDelete(bill._id);
            });

            await Customer.findOneAndDelete({
                idCustomer: req.params.idCustomer
            });

            return res.status(200).json({
                message: 'Customer deleted successfully',
                data: customer
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to delete customer',
                error: err
            });
        }
    }
};