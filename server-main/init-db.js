const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "localhost",
    user: "admin",
    password: "admin",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// SQL statements to create database and tables
const initSQL = [
    // Create database
    'CREATE DATABASE IF NOT EXISTS `example`',

    // Use the database
    'USE `example`',

    // Create users table
    `CREATE TABLE IF NOT EXISTS \`users\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`username\` VARCHAR(255) NOT NULL UNIQUE,
        \`email\` VARCHAR(255) NOT NULL UNIQUE,
        \`password\` VARCHAR(255),
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

    // Create roles table
    `CREATE TABLE IF NOT EXISTS \`roles\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`name\` VARCHAR(255) NOT NULL UNIQUE,
        \`description\` TEXT,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

    // Create user_roles table
    `CREATE TABLE IF NOT EXISTS \`user_roles\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`user_id\` INT NOT NULL,
        \`role_id\` INT NOT NULL,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE,
        FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE,
        UNIQUE KEY \`unique_user_role\` (\`user_id\`, \`role_id\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
];

console.log('🔧 Initializing database...\n');

let currentSQL = 0;

function executeSQL() {
    if (currentSQL >= initSQL.length) {
        console.log('✅ Database initialization completed successfully!');
        pool.end(() => {
            console.log('Database connection closed.');
            process.exit(0);
        });
        return;
    }

    const sql = initSQL[currentSQL];
    console.log(`📝 Executing: ${sql.substring(0, 50)}...`);

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('❌ Database connection error:', err);
            process.exit(1);
        }

        connection.query(sql, (error, results) => {
            connection.release();

            if (error) {
                // Some errors are acceptable (like "database already exists")
                if (error.code === 'ER_DB_CREATE_EXISTS' || error.code === 'ER_TABLE_EXISTS_ERROR') {
                    console.log(`⚠️  Already exists (skipped)`);
                } else {
                    console.error('❌ Error:', error.message);
                    process.exit(1);
                }
            } else {
                console.log('✓ Success');
            }

            currentSQL++;
            executeSQL();
        });
    });
}

executeSQL();

