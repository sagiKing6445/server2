const User = require('../models/user.model');

exports.getAllUsers = (req, res) => {
    User.findAll((err, data) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({
                message: 'Error fetching users',
                error: err.message
            });
        }
        res.json(data);
    });
};

exports.getUserById = (req, res) => {
    User.findById(req.params.id, (err, data) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).json({
                message: 'Error fetching user',
                error: err.message
            });
        }
        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(data[0]);
    });
};

exports.createUser = (req, res) => {
    // Only allow specific fields, exclude timestamps
    const userData = {
        username: req.body.username,
        email: req.body.email
    };
    if (req.body.password) userData.password = req.body.password;

    User.create(userData, (err) => {
        if (err) {
            console.error('Error creating user:', err);
            return res.status(500).json({
                message: 'Error creating user',
                error: err.message
            });
        }
        // Reload all users and return them
        User.findAll((err, data) => {
            if (err) {
                return res.status(201).json({ message: 'User created successfully' });
            }
            res.status(201).json({ message: 'User created successfully', users: data });
        });
    });
};

exports.updateUser = (req, res) => {
    // Only allow updating specific fields, exclude timestamps
    const allowedFields = { username: req.body.username, email: req.body.email };
    if (req.body.password) allowedFields.password = req.body.password;

    User.update(req.params.id, allowedFields, (err) => {
        if (err) {
            console.error('Error updating user:', err);
            return res.status(500).json({
                message: 'Error updating user',
                error: err.message
            });
        }
        // Reload all users and return them
        User.findAll((err, data) => {
            if (err) {
                return res.json({ message: 'User updated successfully' });
            }
            res.json({ message: 'User updated successfully', users: data });
        });
    });
};

exports.deleteUser = (req, res) => {
    User.remove(req.params.id, (err) => {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({
                message: 'Error deleting user',
                error: err.message
            });
        }
        // Reload all users and return them
        User.findAll((err, data) => {
            if (err) {
                return res.json({ message: 'User deleted successfully' });
            }
            res.json({ message: 'User deleted successfully', users: data });
        });
    });
};