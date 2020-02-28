const mysql = require("mysql");
const inquirer = require("inquirer");



const connection = mysql.createConnection({
    host: "localhost",


    port: 3306,


    user: "root",

    password: "18877MSca",
    database: "employee_trackerDB"
});

connection.connect(function (err) {
    if (err) throw err;

    runSearch();
});

function runSearch() {

    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all employees by department",
                "View all employees by Manager",
                "Add employee",
                "Remove employee",
                "Update employee role",
                "Update employee manager"
            ]
        })
        .then(answer => {

            switch (answer.action) {
                case "View all employees":
                    allEmployees();
                    break;

                case "View all employees by department":
                    allEmployees_byDep();
                    break;

                case "View all employees by Manager":
                    allEmployees_byManager();
                    break;

                case "Add employee":
                    addEmployee();
                    break;

                case "Remove employee":
                    deleteEmployee();
                    break;

                case "Update employee role":
                    updateRole();
                    break;

                case "Update employee manager":
                    updateManager();
                    break;
            }
        });
}

function allEmployees() {
    // let query = "SELECT employee_id, first_name, last_name, role.tittle, role.salary FROM employee JOIN role ON employee.role_id = role.role_id" 

    // let query = " SELECT employee_id, first_name, last_name, role.tittle, role.salary, department.name FROM employee JOIN role ON employee.role_id = role.role_id JOIN department ON role.role_id = department.department_id"
    let query = `SELECT * FROM employee`
    connection.query(query, (err, results) => {
        if (err) throw err;

        console.log("  id ||     Name    ");
        console.log("  --    -------------------------")

        results.forEach(element => {

            console.log("| "+ element.employee_id + ' -> ' + element.first_name + ' ' + element.last_name )

        });
        console.log("-------------------------------")
        runSearch();
    }
    )
};





function addEmployee() {



    //    let query1 = " SELECT DISTINCT employee_id, first_name, last_name, role.role_id, role.tittle, role.salary, department.name FROM employee JOIN role ON employee.role_id = role.role_id JOIN department ON role.role_id = department.department_id"
    //    let query1 = " SELECT DISTINCT employee_id, first_name,  role.tittle,  department.name FROM employee JOIN role ON employee.role_id = role.role_id JOIN department ON role.role_id = department.department_id"
    let query1 = "SELECT * FROM department"

    connection.query(query1, (err, results) => {
        if (err) throw err;
        console.log(results);

        inquirer
            .prompt([
                {
                    name: "name",
                    type: "input",
                    message: "what is the employee name?"
                },
                {
                    name: "lastname",
                    type: "input",
                    message: "what is the employee last name?",
                },
                {
                    name: "department",
                    message: "what department does the employee works?",
                    type: "rawlist",
                    choices: function () {
                        console.log("-------DEPARTMENTS-----");
                        return results.map(item => {
                            console.log("| id " + item.department_id + " -> " + item.name);
                            return item.department_id
                        });
                    }
                }]).then(function (response1) {

                    let query2 = "SELECT * FROM role"

                    connection.query(query2, (err, results1) => {
                        if (err) throw err;
                        console.log(response1);
                        inquirer
                            .prompt([
                                {
                                    name: "tittle",
                                    message: "What is the employee's role?",
                                    type: "list",
                                    choices: function () {
                                        console.log("------TITTLE-----------------------");
                                        return results1.map(item => {
                                            console.log("| " + item.role_id + "-> " + item.tittle);
                                            return item.role_id;
                                        });

                                    },
                                }
                            ]).then(function (response2) {


                                let query3 = "SELECT * FROM employee"

                                connection.query(query3, (err, results2) => {
                                    if (err) throw err;
                                    console.log(response2);
                                    inquirer
                                        .prompt([
                                            {
                                                name: "manager",
                                                message: "Who is the employee's manager?",
                                                type: "list",
                                                choices: function () {
                                                    console.log("-------MANAGERS-----");
                                                    return results2.map(item => {
                                                        console.log("| id " + item.employee_id + "-> " + item.first_name + " " + item.last_name)
                                                        return item.employee_id;
                                                    });
                                                },
                                            }
                                        ]).then(function (response3) {

                                            var name = response1.name;
                                            var lastname = response1.lastname;
                                            var department = response1.department;
                                            var tittle = response2.tittle;
                                            var manager = response3.manager;
                                            console.log(name + " " + lastname + " " + department + " " + tittle + " " + manager);

                                            let query3 = `INSERT INTO employee ( first_name, last_name, role_id, manager_id) VALUES ('${response1.name}','${response1.lastname}',${response2.tittle},${response3.manager})`
                                            connection.query(query3, (err, results3) => {
                                                if (err) throw err;
                                                console.log(results3);

                                                
                                                console.log("employee added!");
                                                runSearch();
                                            });
                                  


                                });
                            });
                    });
                });


        });
    });

};








function allEmployees_byDep() {
    connection.query("SELECT name, department_id from department",
        (err, results) => {
            if (err) throw err;
            // console.log(results);
            inquirer
                .prompt([
                    {
                        name: "department",
                        message: "Pick department by id to see employees",
                        type: "rawlist",
                        choices: function () {
                            console.log("-------DEPARTMENTS-----");
                            return results.map(item => {
                                console.log("| id " + item.department_id + " -> " + item.name);
                            console.log("-----------------------")
                                return item.department_id

                            });
                            
                        },
                    },
                ]).then(function (response) {
                    // let query = `SELECT first_name, last_name FROM employee WHERE role_id IN (SELECT department.department_id= ${response.department} FROM department)`
                    let query = `SELECT first_name, last_name FROM employee WHERE role_id = ${response.department}`

                    connection.query(query, (err, results) => {
                        if (err) throw err;
                        console.log("------EMPLOYESS------");

                        results.forEach(element => {
                            console.log('| ' + element.first_name + ' ' + element.last_name);

                        });
                        console.log("----------------------");
                        runSearch();
                    });

                });
        }
    )
};

function allEmployees_byManager() {
    connection.query("SELECT first_name, last_name, employee_id, role_id FROM employee WHERE employee_id IN (SELECT manager_id from employee)",
        (err, results) => {
            if (err) throw err;
            console.log(results);
            inquirer
                .prompt([
                    {
                        name: "manager",
                        message: "which manager's employee would you like to see?",
                        type: "rawlist",
                        choices: function () {
                            console.log("-------MANAGERS-----");
                            return results.map(item => {
                                console.log("| id " + item.employee_id + "-> " + item.first_name + " " + item.last_name)
                                return item.employee_id;
                            });
                        },
                    },

                ]).then(function (response) {
                    let query = `SELECT first_name, last_name, employee_id, role_id FROM employee WHERE manager_id = ${response.manager}`
                    connection.query(query, (err, results) => {
                        if (err) throw err;
                        console.log("------EMPLOYESS-----------------------");
                        results.forEach(element => {
                            console.log('| ' + element.first_name + ' ' + element.last_name);

                        });
                        console.log("--------------------------------------");
                        runSearch();
                    });

                });
        }
    )
};





function updateRole() {
    connection.query("SELECT *  FROM employee",
        (err, results) => {
            if (err) throw err;
            console.log(results);
            inquirer
                .prompt([
                    {
                        name: "employee",
                        message: "Select an Employe by ID to modify the role",
                        type: "rawlist",
                        choices: function () {
                            console.log("------EMPLOYESS-----------------------");
                            return results.map(item => {
                                console.log("| " + item.employee_id + "-> " + item.first_name + " " + item.last_name + " " + item.tittle);
                                return item.employee_id;
                            });
                        },
                    }
                ]).then(function (response1) {
                    let query = `SELECT * FROM role`
                    connection.query(query, (err, results) => {
                        if (err) throw err;
                        inquirer
                            .prompt([
                                {
                                    name: "newtittle",
                                    message: "what is the new role of this employee?",
                                    type: "rawlist",
                                    choices: function () {
                                        console.log("------TITTLE-----------------------");
                                        return results.map(item => {
                                            console.log("| " + item.role_id + "-> " + item.tittle);
                                            return item.role_id;
                                        });
                                    },
                                }


                            ]).then(function (response) {

                                connection.query(`UPDATE employee SET role_id = ${response.newtittle} WHERE employee_id = ${response1.employee} `,
                                    (err, results) => {
                                        if (err) throw err;

                                        console.log("role updated!");

                                        runSearch();
                                    });

                            });
                    })
                });
        
            })

    }


    function deleteEmployee() {
            connection.query("SELECT first_name, last_name, employee_id FROM employee",
                (err, results) => {
                    if (err) throw err;

                    console.log(results);
                    inquirer
                        .prompt([
                            {
                                name: "employeeselected",
                                message: "Select employee by ID to delete",
                                type: "rawlist",
                                choices: function () {
                                    console.log("------EMPLOYESS-----------------------");
                                    return results.map(item => {
                                        console.log("| " + item.employee_id + "-> " + item.first_name + " " + item.last_name );
                                        return item.employee_id;
                                    });
                                },
                            },
                        ]).then(function (response) {
                            console.log(response.employeeselected);
                            connection.query("DELETE FROM employee WHERE ?",
                                {
                                    employee_id: response.employeeselected
                                },
                                (err, results) => {
                                    if (err) throw err;
                                    console.log("employee deleted!");
                                });
                            runSearch();
                        });
                }
            )
        };

    function updateManager() {

        // allEmployees();
        let query = "SELECT first_name, last_name, employee_id FROM employee"
        connection.query(query, (err, results) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        name: "employeetoupdate",
                        message: "which employee would you like to update the manager?",
                        type: "rawlist",
                        choices: function () {
                            console.log("-------EMPLOYESS-----");
                            return results.map(item => {
                                console.log("| id " + item.employee_id + "-> " + item.first_name + " " + item.last_name)
                                return item.employee_id;
                            });
                        },
                    },
                    {
                        name: "managerupdate",
                        message: "who is going to be the employee's manager?",
                        type: "rawlist",
                        choices: function () {
                            console.log("-------MANAGERS-----");
                            return results.map(item => {
                                console.log("| id " + item.employee_id + "-> " + item.first_name + " " + item.last_name)
                                return item.employee_id;
                            });
                        },
                    },
                ]).then(function (response) {
                    connection.query(`UPDATE employee SET manager_id = ${response.managerupdate} WHERE employee_id = ${response.employeetoupdate}`,
            
                        (err, results) => {
                            if (err) throw err;
                            console.log("--------------------");
                            console.log("| Manager updated! |");
                            console.log("--------------------");
                            runSearch();
                          
                        });

                });
        }
        )
    };





