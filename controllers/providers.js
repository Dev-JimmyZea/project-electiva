'use strict';

const Provider = require('../models/provider');

module.exports = {
    getProviders: async (req, res) => {
        try {
            const providers = await Provider.find();
            return res.status(200).json({
                message: 'Providers fetched successfully',
                providers: providers
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to fetch providers',
                error: err
            });
        }
    },

    getProvider: async (req, res) => {
        try {
            const provider = await Provider.findOne({
                idProvider: req.params.idProvider
            });
            if (!provider) {
                return res.status(404).json({
                    message: 'Provider not found',
                });
            }
            return res.status(200).json({
                message: 'Provider fetched successfully',
                provider: provider
            });

        } catch (err) {
            return res.status(500).json({
                message: 'Failed to fetch provider',
                error: err
            });
        }
    },
    
    createProvider: async (req, res) => {
        try {
            const provider = new Provider(req.body);
            await provider.save();
            return res.status(201).json({
                message: 'Provider created successfully',
                provider: provider
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to create provider',
                error: err
            });
        }
    },

    replaceProvider: async (req, res) => {
        try {
            const provider = await Provider.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });
            if (!provider) {
                return res.status(404).json({
                    message: 'Provider not found',
                });
            }
            return res.status(200).json({
                message: 'Provider replaced successfully',
                provider: provider
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to replace provider',
                error: err
            });
        }
    },

    updateProvider: async (req, res) => {
        try {
            const provider = await Provider.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });
            if (!provider) {
                return res.status(404).json({
                    message: 'Provider not found',
                });
            }
            return res.status(200).json({
                message: 'Provider updated successfully',
                provider: provider
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to update provider',
                error: err
            });
        }
    },

    deleteProvider: async (req, res) => {
        try {
            const provider = await Provider.findOneAndDelete({
                idProvider: req.params.idProvider
            });
            if (!provider) {
                return res.status(404).json({
                    message: 'Provider not found',
                });
            }
            return res.status(200).json({
                message: 'Provider deleted successfully',
                provider: provider
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to delete provider',
                error: err
            });
        }
    }
};