const Role = require('../models/roleModel');

const createRole = async (req, res) => {    
  try {
    const { title } = req.body;
    const existingRole = await Role.findOne({ title });

    if (existingRole) {
      return res.status(409).json({ message: 'Role already exists' });
    }

    const role = new Role({ title });
    const savedRole = await role.save();

    res.status(201).json({ message: 'Role created', role: savedRole });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getRoles = async (req, res) => {
  try {
    const roles = await Role.find({});
    res.status(200).json({ roles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createRole, getRoles };