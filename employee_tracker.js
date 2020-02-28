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

    let query = " SELECT employee_id, first_name, last_name, role.tittle, role.salary, department.name FROM employee JOIN role ON employee.role_id = role.role_id JOIN department ON role.role_id = department.department_id"

    connection.query(query, (err, results) => {
        if (err) throw err;

        console.log("id || first_name || last_name || tittle || Salary || department");
        console.log("--    ----------    ---------    ------    ------    ----------")

        results.forEach(element => {

            console.log(element.employee_id + '     ' + element.first_name + '         ' + element.last_name + '      ' + element.tittle + '   ' + element.salary + '    ' + element.name)

        });
        runSearch();
    }
    )
};





function addEmployee() {



    //    let query1 = " SELECT DISTINCT employee_id, first_name, last_name, role.role_id, role.tittle, role.salary, department.name FROM employee JOIN role ON employee.role_id = role.role_id JOIN department ON role.role_id = department.department_id"
    //    let query1 = " SELECT DISTINCT employee_id, first_name,  role.tittle,  department.name FROM employee JOIN role ON employee.role_id = role.role_id JOIN department ON role.role_id = department.department_id"
    let query1 = "SELECT name FROM department"

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
                        return results.map(item => {
                            return item.name;
                        });
                    }
                }]).then(function (response1) {

                    let query2 = "SELECT tittle , role_id FROM role"

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
                                        return results1.map(item => {
                                            return item.tittle;
                                        });

                                    },
                                }
                        ]).then(function (response2) {

                               
                                    let query3 = "SELECT first_name FROM employee"

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
                                                        return results2.map(item => {
                                                            return item.first_name;
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
                                                   
                                                    let query3 = `SELECT employee_id FROM employee WHERE first_name = '${response3.manager}'`
                                                    connection.query(query3, (err, results3) => {
                                                        if (err) throw err;
                                                        console.log(results3); 
                                                        
                                                    });
                                                        let query4 = `SELECT role_id FROM role WHERE tittle = '${response2.tittle}'`
                                                        connection.query(query4, (err, response4) => {
                                                            if (err) throw err;
                                                            
                                                            console.log(response4)
                                                            
                                                        });
                                                            let query5 = `INSERT INTO employee ( first_name, last_name, manager_id) VALUES ('${response1.name}','${response1.last_name}',${response4},${results3})`
                                                            connection.query(query5, (err, results5) => {
                                                                if (err) throw err;
                                                                console.log("employee added!"); 
                                                                runSearch();
                                                        });


                                                });
                                   

                                    });
                                });
                     });
                });


        // });
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
                                console.log("__________DEPARTMENTS___________");
                                return results.map(item => {
                                    console.log("| id "+item.department_id + " -> " +item.name);
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
                                return results.map(item => {
                                    return "Id " + item.employee_id + " " + item.first_name + " " + item.last_name;
                                });
                            },
                        },

                    ]).then(function (response) {
                        connection.query("SELECT first_name, last_name, employee_id, role_id FROM employee WHERE ?",
                            {

                                manager_id: response.manager[3]

                            }, (err, results) => {
                                if (err) throw err;
                                results.forEach(element => {
                                    console.log('name: ' + element.first_name + ' || last name: ' + element.last_name);

                                });
                                runSearch();
                            });

                    });
            }
        )
    };





    function updateRole() {
        connection.query("SELECT first_name, last_name, employee_id, employee.role_id, role.tittle, role.salary  FROM employee JOIN role ON employee.role_id = role.role_id",
            (err, results) => {
                if (err) throw err;
                console.log(results);
                inquirer
                    .prompt([
                        {
                            name: "employee",
                            message: "which employee's role would you like to modify?",
                            type: "rawlist",
                            choices: function () {
                                return results.map(item => {
                                    return item.employee_id + " " + item.first_name + " " + item.last_name + " " + item.tittle;
                                });
                            },
                        },
                        {
                            name: "newtittle",
                            message: "what role this this employee does now?",
                            type: "rawlist",
                            choices: function () {
                                return results.map(item => {
                                    return item.tittle;
                                });
                            },
                        },
                        {
                            name: "newsalary",
                            message: "what is the employee's new salary?",
                            type: "input"

                        }

                    ]).then(function (response) {
                        console.log(response.employee);
                        console.log(response.newtittle);
                        connection.query(`UPDATE role SET tittle = ${response.newtittle}, salary = ${response.newsalary} WHERE role_id = ${response.employee[0]} `,
                            {
                                tittle: response.newtittle,
                                salary: response.newsalary,

                                role_id: response.employee[0]

                            }, (err, results) => {
                                if (err) throw err;

                                console.log("role updated");

                                runSearch();
                            });

                    });
            }
        )
    };

    function deleteEmployee() {
        connection.query("SELECT first_name, last_name, employee_id FROM employee",
            (err, results) => {
                if (err) throw err;

                console.log(results);
                inquirer
                    .prompt([
                        {
                            name: "employeeselected",
                            message: "which employee would you like to delete?",
                            type: "rawlist",
                            choices: function () {
                                return results.map(item => {
                                    return item.employee_id + " " + item.first_name + " " + item.last_name;
                                });
                            },
                        },
                    ]).then(function (response) {
                        console.log(response.employeeselected);
                        connection.query("DELETE FROM employee WHERE ?",
                            {
                                employee_id: response.employeeselected.substring(0, 2)
                            },
                            (err, results) => {
                                if (err) throw err;
                                console.log("employee deleted");
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
                            return results.map(item => {
                                return item.employee_id
                                // + " " + item.first_name + " " + item.last_name;
                            });
                        },
                    },
                    {
                        name: "managerupdate",
                        message: "who is going to be the employee's manager?",
                        type: "rawlist",
                        choices: function () {
                            return results.map(item => {
                                return item.employee_id
                                // + " " + item.first_name + " " + item.last_name;
                            });
                        },
                    },
                ]).then(function (response) {
                    connection.query(`UPDATE employee SET manager_id = ${response.managerupdate} WHERE employee_id = ${response.employeetoupdate}`,
                        // {


                        //         manager_id: response.managerupdate[0],
                        //         employee_id: response.employeetoupdate[0]

                        //     },
                        (err, results) => {
                            if (err) throw err;
                            console.log("manager updated!");
                            // allEmployees();
                        });

                });
        }
        )
    };



// function promptRole(){
//     let query = "SELECT * FROM role";

//     connection.query(query,(err, results) => {
//             if (err) throw err;
//             console.log(results);

//             inquirer
//                 .prompt([
//                     {
//                         name: "role",
//                         message: "what is the employee role?",
//                         type: "rawlist",
//                         choices: function () {
//                             return results.map(item => {
//                                 return item.employee_id 

//                             });
//                         },
//                     },                 


// }






