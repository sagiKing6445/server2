const express = require('express');
const router = express.Router();
const c = require('../controllers/roles.controller');

router.post('/', c.createRole);
router.get('/', c.getRoles);
router.get('/:id', c.getRoleById);
router.put('/:id', c.updateRole);
router.delete('/:id', c.deleteRole);

module.exports = router;