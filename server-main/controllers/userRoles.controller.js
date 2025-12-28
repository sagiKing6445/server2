const UserRole = require('../models/userRole.model');

exports.assignRole = (req, res) => {
    const data = {
        user_id: req.body.user_id,
        role_id: req.body.role_id
    };

    UserRole.create(data, err => {
        if (err) {
            console.error('Error assigning role:', err);
            return res.status(500).json({
                message: 'Error assigning role',
                error: err.message
            });
        }
        UserRole.findAll((err, userRoleData) => {
            if (err) {
                return res.status(201).json({ message: 'Role assigned successfully' });
            }
            res.status(201).json({ message: 'Role assigned successfully', userRoles: userRoleData });
        });
    });
};

exports.getUserRoles = (req, res) => {
    UserRole.findAll((err, data) => {
        if (err) {
            console.error('Error fetching user roles:', err);
            return res.status(500).json({
                message: 'Error fetching user roles',
                error: err.message
            });
        }
        res.json(data);
    });
};

exports.getUserRoleById = (req, res) => {
    UserRole.findById(req.params.id, (err, data) => {
        if (err) {
            console.error('Error fetching user role:', err);
            return res.status(500).json({
                message: 'Error fetching user role',
                error: err.message
            });
        }
        if (!data || data.length === 0) return res.status(404).json({ message: 'User role not found' });
        res.json(data[0]);
    });
};

exports.getUserRolesByUserId = (req, res) => {
    UserRole.findByUserId(req.params.userId, (err, data) => {
        if (err) {
            console.error('Error fetching user roles by user ID:', err);
            return res.status(500).json({
                message: 'Error fetching user roles',
                error: err.message
            });
        }
        res.json(data);
    });
};

exports.updateUserRole = (req, res) => {
    const data = {
        user_id: req.body.user_id,
        role_id: req.body.role_id
    };

    UserRole.update(req.params.id, data, err => {
        if (err) {
            console.error('Error updating user role:', err);
            return res.status(500).json({
                message: 'Error updating user role',
                error: err.message
            });
        }
        UserRole.findAll((err, userRoleData) => {
            if (err) {
                return res.json({ message: 'User role updated successfully' });
            }
            res.json({ message: 'User role updated successfully', userRoles: userRoleData });
        });
    });
};

exports.deleteUserRole = (req, res) => {
    UserRole.remove(req.params.id, err => {
        if (err) {
            console.error('Error deleting user role:', err);
            return res.status(500).json({
                message: 'Error deleting user role',
                error: err.message
            });
        }
        UserRole.findAll((err, userRoleData) => {
            if (err) {
                return res.json({ message: 'User role deleted successfully' });
            }
            res.json({ message: 'User role deleted successfully', userRoles: userRoleData });
        });
    });
};
