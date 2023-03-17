const { body } = require('express-validator');
const Permission = require('../models/permissionModel');

const isTitleAlreadyRegistered = async (title) => {
    const user = await Permission.findOne({ title });
    if (user) {
        return Promise.reject('Email is already registered');
    }
};

const permissionValidator = () => {
    return [body('title').notEmpty().custom(isTitleAlreadyRegistered)];
};

module.exports = permissionValidator;
