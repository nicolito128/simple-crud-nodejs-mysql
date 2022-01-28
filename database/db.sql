-- creating the database
CREATE DATABASE crudnodejs;

-- using the db
use crudnodejs;

-- creating a table
CREATE TABLE customer {
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    address VARCHAR(100) NOT NULL,
    phone VARCHAR(20)
};

-- to show all tables
SHOW TABLES;

-- to describe the table
describe customer;