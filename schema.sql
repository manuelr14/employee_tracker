DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

 CREATE TABLE department (
 department_id INT AUTO_INCREMENT NOT NULL,
 name VARCHAR (30),
 PRIMARY KEY (department_id)
  
 );

 CREATE TABLE role (
 role_id INT AUTO_INCREMENT NOT NULL,
 tittle VARCHAR (30),
 salary DECIMAL (12,4),
 department_id INT,
 PRIMARY KEY (role_id),
 FOREIGN KEY (role_id) REFERENCES department (department_id)
 );
 
 
CREATE TABLE employee (
employee_id INT AUTO_INCREMENT NOT NULL,
first_name varchar (30),
last_name varchar (30),
role_id INT,
manager_id INT NULL,
PRIMARY KEY(employee_id),
FOREIGN KEY (employee_id) REFERENCES role (role_id),
FOREIGN KEY (manager_id) REFERENCES employee (employee_id)
);


