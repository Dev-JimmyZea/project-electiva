'use strict';

const Bill = require('../models/bill');
const Detail = require('../models/detail');
const Product = require('../models/product');
const Customer = require('../models/customer');

module.exports = {
    getBills: async (req, res) => {
        try {
            const bills = await Bill.find().populate('customer');
            return res.status(200).json({
                message: 'Bills fetched successfully',
                data: bills
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to fetch bills',
                error: err
            });
        }
    },
    getBill: async (req, res) => {
        try {
            const bill = await Bill.findOne({ 
                number: req.params.number 
            }).populate('customer');
            if (!bill) {
                return res.status(404).json({
                    message: 'Bill not found'
                });
            }
            return res.status(200).json({
                message: 'Bill fetched successfully',
                data: bill
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to fetch bill',
                error: err
            });
        }
    },
    createBill: async (req, res) => {
        try {

            const customer = await Customer.findOne({
                idCustomer: req.params.customer
            });

            if (!customer) {
                return res.status(404).json({
                    message: 'Customer not found'
                });
            }

            const bill = new Bill(req.body);

            customer.bills.push(bill);
            await customer.save();

            const updatedCustomer = await Customer.findOne({
                idCustomer: req.params.customer
            });

            bill.customer = updatedCustomer;

            await bill.save();
            
            return res.status(200).json({
                message: 'Bill created successfully',
                data: bill
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to create bill',
                error: err
            });
        }
    },

    replaceBill: async (req, res) => {
        try {
            const bill = await Bill.findByIdAndUpdate(req.params.id, req.body, {
                new: true
            });
            if (!bill) {
                return res.status(404).json({
                    message: 'Bill not found'
                });
            }
            return res.status(200).json({
                message: 'Bill replaced successfully',
                data: bill
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to replace bill',
                error: err
            });
        }
    },

    updateBill: async (req, res) => {
        try {
            const bill = await Bill.findByIdAndUpdate(req.params.id, req.body, {
                new: true
            });
            return res.status(200).json({
                message: 'Bill updated successfully',
                data: bill
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to update bill',
                error: err
            });
        }
    },
    deleteBill: async (req, res) => {
        try {
            const bill = await Bill.findOne({ 
                number: req.params.number 
            }).populate('details');

            if (!bill) {
                return res.status(404).json({
                    message: 'Bill not found'
                });
            }

            bill.details.forEach(async (detail) => {
                await Product.findByIdAndUpdate(detail.product, {
                    $inc: {
                        stock: detail.cant
                    }
                });
                await Detail.findByIdAndDelete(detail._id);
            });
            
            await Bill.findOneAndDelete(req.params.number);
            
            return res.status(200).json({
                message: 'Bill deleted successfully',
                data: bill
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to delete bill',
                error: err
            });
        }
    },

    addDetail: async (req, res) => {
        try {
            const bill = await Bill.findOne({ 
                number: req.params.number 
            });
            if (!bill) {
                return res.status(404).json({
                    message: 'Bill not found'
                });
            }
            const detail = await Detail.findOne({ 
                code: req.params.codeDetail 
            });
            if (!detail) {
                return res.status(404).json({
                    message: 'Detail not found'
                });
            }
            if (bill.details.includes(detail._id)) {
                return res.status(404).json({
                    message: 'Detail already added'
                });
            }            
            bill.details.push(detail);
            await bill.save();
            return res.status(200).json({
                message: 'Detail added successfully',
                data: bill
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to add detail',
                error: err
            });
        }
    },

    getDetails: async (req, res) => {
        try {
            const bill = await Bill.findOne({ 
                number: req.params.number 
            }).populate('details');
            if (!bill) {
                return res.status(404).json({
                    message: 'Bill not found'
                });
            }
            return res.status(200).json({
                message: 'Details fetched successfully',
                data: bill.details
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to fetch details',
                error: err
            });
        }
    },

    calcTotal: async (req, res) => {
        try {
            const bill = await Bill.findOne({ 
                number: req.params.number 
            }).populate('details');
            
            if (!bill) {
                return res.status(404).json({
                    message: 'Bill not found'
                });
            }
            let total = 0;
            bill.details.forEach(detail => {
                total += detail.subtotal;
            });

            return res.status(200).json({
                message: 'Total calculated successfully',
                data: 'The total of the bill whit number '+ req.params.number +' is $'+total
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to calculate total',
                error: err
            });
        }
    }    

};