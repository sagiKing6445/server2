const db = require('../middleware/mysqldb');

exports.create = (data, cb) => {
    db.query('INSERT INTO user_roles SET ?', data, cb);
};

exports.findAll = (cb) => {
    db.query(`
        SELECT ur.id, u.id as user_id, u.username, r.id as role_id, r.name AS role
        FROM user_roles ur
        JOIN users u ON ur.user_id = u.id
        JOIN roles r ON ur.role_id = r.id
    `, cb);
};

exports.findById = (id, cb) => {
    db.query('SELECT * FROM user_roles WHERE id=?', [id], cb);
};

exports.findByUserId = (userId, cb) => {
    db.query(`
        SELECT ur.id, u.id as user_id, u.username, r.id as role_id, r.name AS role
        FROM user_roles ur
        JOIN users u ON ur.user_id = u.id
        JOIN roles r ON ur.role_id = r.id
        WHERE ur.user_id = ?
    `, [userId], cb);
};

exports.update = (id, data, cb) => {
    db.query('UPDATE user_roles SET ? WHERE id=?', [data, id], cb);
};

exports.remove = (id, cb) => {
    db.query('DELETE FROM user_roles WHERE id=?', [id], cb);
};
