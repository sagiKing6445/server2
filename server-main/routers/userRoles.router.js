const express = require('express');
const router = express.Router();
const c = require('../controllers/userRoles.controller');

router.post('/', c.assignRole);
router.get('/', c.getUserRoles);
router.get('/:id', c.getUserRoleById);
router.put('/:id', c.updateUserRole);
router.delete('/:id', c.deleteUserRole);

module.exports = router;
