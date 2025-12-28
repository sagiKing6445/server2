const db = require('../middleware/mysqldb');

exports.create = (data, cb) => {
    db.query('INSERT INTO users SET ?', data, cb);
};

exports.findAll = (cb) => {
    db.query('SELECT * FROM users', cb);
};

exports.findById = (id, cb) => {
    db.query('SELECT * FROM users WHERE id=?', [id], cb);
};

exports.update = (id, data, cb) => {
    db.query('UPDATE users SET ? WHERE id=?', [data, id], cb);
};

exports.remove = (id, cb) => {
    db.query('DELETE FROM users WHERE id=?', [id], cb);
};
