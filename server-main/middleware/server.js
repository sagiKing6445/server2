const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const usersRouter = require('../routers/users.router');
const rolesRouter = require('../routers/roles.router');
const userRolesRouter = require('../routers/userRoles.router');

server.use(cors());
server.use(bodyParser.json());
server.use('/users', usersRouter);
server.use('/roles', rolesRouter);
server.use('/user-roles', userRolesRouter);

server.get('/', (req, res) => {
    res.send('<h1>Application is online</h1>');
});

module.exports = server;
module.exports = server;