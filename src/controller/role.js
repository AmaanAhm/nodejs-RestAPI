const Role = require('../models/roleModel');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'my-secret-key';

const createRole = async (req, res) => {
    try {
        const { title } = req.body;
        const existingRole = await Role.findOne({ title });

        if (existingRole) {
            return res.status(409).json({ message: 'Role already exists' });
        }

        const role = new Role({ title });
        const savedRole = await role.save();

        const token = jwt.sign({ userId: title._id }, SECRET_KEY);

        res.status(201).json({ message: 'Role created', role: savedRole, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const getRoles = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const roles = await Role.find({});
        res.status(200).json({ roles });
      } catch (err) {
        res.status(403).json({ message: 'Failed to authenticate token' });
      }
    } else {
      res.status(401).json({ message: 'Token not provided' });
    }
  };

// const update = async (_id) => {
//     try {
//         const role = await Role.updateOne({_id},{
//         $set: {
//             title: "updated"
//         }}
//         )
//     } catch (error) {
//         console.log(error);
//     }

// }
// update("6407931f7f33b8d6f15879b7")

//update by id
const update = async (req, res) => {
    const id = req.params.id;
    const titleUpdate = req.body;

    try {
        const result = await Role.findByIdAndUpdate(id, titleUpdate, { new: true });
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// Role deleted
const deleteRole = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedRole = await Role.findByIdAndDelete(id);
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

module.exports = { createRole, getRoles, update, deleteRole };
