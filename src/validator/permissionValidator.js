const { body } = require('express-validator');
const Permission = require('../schema/permissionSchema');

const isTitleAlreadyRegistered = async (req, res) => {
    const user = await Permission.findOne({ title });
    if (user) {
        return Promise.reject('Email is already registered');
    }
};

const permissionValidator = () => {
    return [body('title').notEmpty().custom(isTitleAlreadyRegistered)];
};

module.exports = permissionValidator;
