DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE departments (
dept_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
dept_name VARCHAR(60) NOT NULL,
);

CREATE TABLE roles (
role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
role_title VARCHAR(60) NOT NULL,
salary DECIMAL(7 , 2) NOT NULL,
departments_id FOREIGN KEY (dept_id) REFERENCES departments(dept_id),

);

CREATE TABLE employees (
employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(25) NOT NULL,
last_name VARCHAR(25) NOT NULL,
employee_title VARCHAR(60) NOT NULL,
salary DECIMAL(7 , 2) NOT NULL,
manager VARCHAR(25) NOT NULL,
departments_id FOREIGN KEY (dept_id) REFERENCES departments(dept_id),
);