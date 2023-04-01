const User = require('../models/userModel');
const Role = require('../models/roleModel');

const updateRoleId = async (req, res) => {
    try {
        const roleId = req.params.id;
        const { user_id } = req.body;
        const role = await Role.findById(roleId);
        const user = await User.findById(user_id);
        user.role = role;
        // user.roles = role;
        const result = await user.save();
        res.status(200).json({
            user: result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports =  {updateRoleId} ;

// snake case: update_role_id
// kebab case: update-role-id
// camel case: updateRoleId
