DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE employee (
id INT AUTO_INCREMENT NOT NULL,
first_name varchar (30),
last_name varchar (30),
role_id INT,
manager_id INT NULL,
PRIMARY KEY(id)
);
 
 CREATE TABLE role (
 id INT AUTO_INCREMENT NOT NULL,
 tittle VARCHAR (30),
 salary DECIMAL (12,4),
 department_id INT,
 PRIMARY KEY (id),
 FOREIGN KEY (id) REFERENCES employee (id)
 );
 

 CREATE TABLE department (
 id INT AUTO_INCREMENT NOT NULL,
 name VARCHAR (30),
 PRIMARY KEY (id)
  FOREIGN KEY (id) REFERENCES role (id)
 );
 