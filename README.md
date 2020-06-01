# employer_tracker

EmployeeTracker
User interface that utilizes node.js , inquirer package and MySql that make it easy for non-developers to view and interact with information stored in databases.

User Walkthrough
When the user navigates to the console , the first command they need to run for this user interface to work is npm i inquirer and mysql packages . Once that is completed, the user should first run the command node employee_tracker.js . the user is asked to choose among a series of actions that allow him to manipulate and manage the content of the stablished employee database. The user has the option to add departments, add roles, add employees, view departments, view roles, view employees. This database has three tables that contain departments, roles and employees. All three tables are interconnected as some of the actions the user can take requires these three tables to exchange data. This simple yet effective console application makes it easy for non-developers to manage employee database with precision and ease.

first it will be asked with what would the user like to do giving an list of options, for ths example we are going to add an employee

As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business

Developers are often tasked with creating interfaces that make it easy for non-developers to view and interact with information stored in databases. Often these interfaces are known as Content Management Systems. In this homework assignment, your challenge is to architect and build a solution for managing a company's employees using node, inquirer, and MySQL.

Database structure:

department:

id - INT PRIMARY KEY

name - VARCHAR(30) to hold department name


role:

id - INT PRIMARY KEY

title -  VARCHAR(30) to hold role title

salary -  DECIMAL to hold role salary

department_id -  INT to hold reference to department role belongs to

employee:

id - INT PRIMARY KEY

first_name - VARCHAR(30) to hold employee first name

last_name - VARCHAR(30) to hold employee last name

role_id - INT to hold reference to role employee has

manager_id - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager


command-line application allows the user to:

Add departments, roles, employees

View departments, roles, employees

Update employee roles

Update employee managers

View employees by manager

Delete departments, roles, and employees

