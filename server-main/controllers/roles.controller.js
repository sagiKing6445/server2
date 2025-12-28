const Role = require('../models/role.model');

exports.createRole = (req, res) => {
    const roleData = {
        name: req.body.name,
        description: req.body.description
    };

    Role.create(roleData, err => {
        if (err) {
            console.error('Error creating role:', err);
            return res.status(500).json({
                message: 'Error creating role',
                error: err.message
            });
        }
        Role.findAll((err, data) => {
            if (err) {
                return res.status(201).json({ message: 'Role created successfully' });
            }
            res.status(201).json({ message: 'Role created successfully', roles: data });
        });
    });
};

exports.getRoles = (req, res) => {
    Role.findAll((err, data) => {
        if (err) {
            console.error('Error fetching roles:', err);
            return res.status(500).json({
                message: 'Error fetching roles',
                error: err.message
            });
        }
        res.json(data);
    });
};

exports.getRoleById = (req, res) => {
    Role.findById(req.params.id, (err, data) => {
        if (err) {
            console.error('Error fetching role:', err);
            return res.status(500).json({
                message: 'Error fetching role',
                error: err.message
            });
        }
        if (!data || data.length === 0) return res.status(404).json({ message: 'Role not found' });
        res.json(data[0]);
    });
};

exports.updateRole = (req, res) => {
    const roleData = {
        name: req.body.name,
        description: req.body.description
    };

    Role.update(req.params.id, roleData, err => {
        if (err) {
            console.error('Error updating role:', err);
            return res.status(500).json({
                message: 'Error updating role',
                error: err.message
            });
        }
        Role.findAll((err, data) => {
            if (err) {
                return res.json({ message: 'Role updated successfully' });
            }
            res.json({ message: 'Role updated successfully', roles: data });
        });
    });
};

exports.deleteRole = (req, res) => {
    Role.remove(req.params.id, err => {
        if (err) {
            console.error('Error deleting role:', err);
            return res.status(500).json({
                message: 'Error deleting role',
                error: err.message
            });
        }
        Role.findAll((err, data) => {
            if (err) {
                return res.json({ message: 'Role deleted successfully' });
            }
            res.json({ message: 'Role deleted successfully', roles: data });
        });
    });
};
