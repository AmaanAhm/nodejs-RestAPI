const User = require('../models/UserModel');

const updateRoleId = async (req, res) => {
    try {
        const userId = req.params.id;
        const { role_id } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }
        user.role_id = role_id;
        const editRole_id = await user.save();
        res.status(200).json({
            user: editRole_id,
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { updateRoleId };

// snake case: update_role_id
// kebab case: update-role-id
// camel case: updateRoleId
