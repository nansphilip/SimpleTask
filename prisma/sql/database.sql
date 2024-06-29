-- Creates a database
CREATE DATABASE `simple-task-db`;

-- Selects the new database
USE `simple-task-db`;

-- Creates an user and a password
CREATE USER 'simple-task-user'@'localhost' IDENTIFIED BY 'simple-task-password';

-- Allows user to connect to database
GRANT ALL PRIVILEGES ON *.* TO 'simple-task-user'@'localhost';
