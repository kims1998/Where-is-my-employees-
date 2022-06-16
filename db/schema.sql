DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

USE company_db;


CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(60) UNIQUE NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT UNIQUE AUTO_INCREMENT NOT NULL,
  title VARCHAR(60) NULL,
  salary DECIMAL(7,2) NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(id)
);

 CREATE TABLE employee (
  id INT UNIQUE NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(20) NULL,
  last_name VARCHAR(40) NULL,
  roles_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY(roles_id) REFERENCES roles(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);