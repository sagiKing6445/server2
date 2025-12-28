-- Create Database if it doesn't exist
CREATE DATABASE IF NOT EXISTS `example`;
USE `example`;

-- Create Users Table
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(255) NOT NULL UNIQUE,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create Roles Table
CREATE TABLE IF NOT EXISTS `roles` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL UNIQUE,
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create User Roles Junction Table
CREATE TABLE IF NOT EXISTS `user_roles` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `role_id` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE,
  UNIQUE KEY `unique_user_role` (`user_id`, `role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create Indexes for better performance
CREATE INDEX `idx_users_username` ON `users`(`username`);
CREATE INDEX `idx_users_email` ON `users`(`email`);
CREATE INDEX `idx_roles_name` ON `roles`(`name`);
CREATE INDEX `idx_user_roles_user_id` ON `user_roles`(`user_id`);
CREATE INDEX `idx_user_roles_role_id` ON `user_roles`(`role_id`);

-- Insert sample data (optional)
INSERT INTO `roles` (`name`, `description`) VALUES
('Admin', 'Administrator with full access'),
('User', 'Regular user with limited access'),
('Guest', 'Guest user with read-only access')
ON DUPLICATE KEY UPDATE `description`=VALUES(`description`);


