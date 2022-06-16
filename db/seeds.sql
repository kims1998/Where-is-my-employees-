INSERT INTO department (name)
VALUES ('Sales'), ('Engineering'),('HR');

INSERT INTO roles (title, salary, department_id)
VALUES 
('Sales Lead', 198000, 1), 
('Sales Person', 55000, 1), 
('Senior Engineer', 205000, 2), 
('Software Engineer', 185000,2), 
('Senior HR', 101000, 3), 
('HR Correspondent', 90000, 3);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES
('Josh', 'Greene', 1, null), 
('Tim','Bierce', 2, null), 
('Angel', 'Sanchez', 1, 1), 
('Charles', 'Kim', 2, 1), 
('Tim','Buerik', 2, null), 
('Jordan', 'Garrison', 3,3);

SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employee INNER JOIN roles ON roles.id = employee.roles_id;


