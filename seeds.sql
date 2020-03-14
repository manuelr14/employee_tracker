USE employee_trackerDB;

 CREATE TABLE department (
 department_id INT AUTO_INCREMENT,
 name VARCHAR (30),
 PRIMARY KEY (department_id)

 );

 CREATE TABLE role (
 role_id INT auto_increment,
 tittle VARCHAR (30),
 salary DECIMAL (12,4),
 department_id INT,
 PRIMARY KEY (role_id),
 FOREIGN KEY (department_id) REFERENCES department (department_id)
 );
 
 
CREATE TABLE employee (
employee_id INT AUTO_INCREMENT NOT NULL,
first_name varchar (30),
last_name varchar (30),
role_id INT,
manager_id INT NULL,
PRIMARY KEY(employee_id),
FOREIGN KEY (role_id) REFERENCES role (role_id),
FOREIGN KEY (manager_id) REFERENCES employee (employee_id)
);


 

INSERT INTO department (name)
VALUES ('IT');
INSERT INTO department (name)
VALUES ('Sales');
INSERT INTO department (name)
VALUES ('Human Resources');
INSERT INTO department (name)
VALUES ('Service');
INSERT INTO department (name)
VALUES ('Accounting');

INSERT INTO role (tittle, salary, department_id)
VALUES ( 'Engineer', 130000, 1);
INSERT INTO role (tittle, salary, department_id)
VALUES ( 'Intern', 50000, 1);
INSERT INTO role (tittle, salary, department_id)
VALUES ( 'Sales Person', 100000, 2);
INSERT INTO role (tittle, salary, department_id)
VALUES ( 'Sales Manager', 200000, 2);
INSERT INTO role (tittle, salary, department_id)
VALUES ( 'Assistant', 30000, 3);
INSERT INTO role (tittle, salary, department_id)
VALUES ('HR Specialist', 30000, 3);
INSERT INTO role (tittle, salary, department_id)
VALUES ( 'Mechanic', 40000, 4);
INSERT INTO role (tittle, salary, department_id)
VALUES ( 'Porter', 30000, 4);
INSERT INTO role (tittle, salary, department_id)
VALUES ( 'Secretary', 60000, 5);
INSERT INTO role (tittle, salary, department_id)
VALUES ( 'Analist', 80000, 5);


  INSERT INTO employee (first_name, last_name, role_id)
  VALUES ('Manuel', 'Ramirez', 1);





INSERT INTO employee (first_name, last_name, role_id)
  VALUES ('Ray', 'Bruce', 7);


INSERT INTO employee (first_name, last_name, role_id)
  VALUES ('Michelle', 'Mendoza', 5);



INSERT INTO employee (first_name, last_name, role_id)
  VALUES ('Orie', 'Johnson', 2);



INSERT INTO employee (first_name, last_name, role_id)
  VALUES ('Jessica', 'Riley', 5);  

  
  INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES ('Mell', 'Gudinho', 4, 1);
  
    INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES ('Luis', 'Mint', 1, 1);
  
INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES ('Ana', 'Martin', 6, 2 );
  
    INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES ('Miranda', 'Reed', 6, 2 );
  
  INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES ('Melissa', 'Scott', 6, 2 );
  
  INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES ('Zoe', 'Chetlin', 9, 3);
  INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES ('Andrea', 'Hicks', 3, 3);
    INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES ('Andy', 'Sodipo', 10, 3);
  
  INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES ('Marlon', 'Jones', 2, 4 );
  
INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES ('Jeremy', 'Smith', 2, 4 );

  INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES ('Dexter', 'Williams', 8, 4);


  

  

  
  








