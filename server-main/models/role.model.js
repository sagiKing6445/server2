const db = require('../middleware/mysqldb');

exports.create = (data, cb) => {
    db.query('INSERT INTO roles SET ?', data, cb);
};

exports.findAll = (cb) => {
    db.query('SELECT * FROM roles', cb);
};

exports.findById = (id, cb) => {
    db.query('SELECT * FROM roles WHERE id=?', [id], cb);
};

exports.update = (id, data, cb) => {
    db.query('UPDATE roles SET ? WHERE id=?', [data, id], cb);
};

exports.remove = (id, cb) => {
    db.query('DELETE FROM roles WHERE id=?', [id], cb);
};
