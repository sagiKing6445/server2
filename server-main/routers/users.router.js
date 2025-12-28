const controller = require('../controllers/users.controller');
const express = require('express');
const router = express.Router();

router.get('/', controller.getAllUsers);
router.get('/:id', controller.getUserById);
router.post('/', controller.createUser);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);
module.exports = router;