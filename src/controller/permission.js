const Permission = require('../models/permissionModel');

const createPermission = async (request, response) => {
    try {
        const { title } = request.body;
        const existingTitle = await Permission.findOne({ title });

        if (existingTitle) {
            return response.Status(409).json({ message: 'Permission title is already exists' });
        }

        const permission = new Permission({ title });
        const savedPermission = await permission.save();

        response.status(201).json({ message: 'permission title created', permission: savedPermission });
    } catch (error) {
        response.status(500).json({ message: 'Internal server error' });
    }
};

const getPermission = async (request, response) => {
    try {
        const permission = await Permission.find({});
        response.status(200).send({
            permission,
        });
    } catch (error) {
        response.status(500).json({ message: 'Internal server error' });
    }
};

const updatePermission = async (request, response) => {
    const id = request.params.id;
    const titleUpdate = request.body;

    try {
        const result = await Permission.findByIdAndUpdate(id, titleUpdate, { new: true });
        response.status(200).json(result);
    } catch (error) {
        response.status(500).json({ error: 'Something went wrong' });
    }
};

const deletePermission = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedRole = await Permission.findByIdAndDelete(id);
        if (!deletedRole) {
            const error = new Error('Role not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ message: 'Role deleted', role: deletedRole });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

module.exports = { createPermission, getPermission, updatePermission, deletePermission };
