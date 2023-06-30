USE employee_db;

INSERT INTO department (name) VALUES
('Engineering'),
('Legal'),
('Sales'),
('Finance');

INSERT INTO role (title, salary, department_id) VALUES
('Accountant', 90000, 2),
('Sales Lead', 60000, 1),
('Lead Engineer', 150000, 4),
('Lawyer', 180000, 3),
('Legal Team Lead', 80000, 2),
('Salesperson', 100000, 1),
('Software Engineer', 110000, 1);

INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES
('Sophia', 'Smith', null, 3),
('Benjamin', 'Johnson', null, 1),
('Ava', 'Williams', null, 4),
('Noah', 'Brown', 2, 6),
('Olivia', 'Jones', 5, 8),
('William', 'Davis', 7, 2),
('Isabella', 'Miller', 1, 3);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;