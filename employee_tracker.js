const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "18877MSca",
    database: "employee_trackerDB"
});

connection.connect(function (err) {
    if (err) throw err;
    //Make sure we're calling our runSearch function ONLY AFTER our connection to the database was successfully established
    runSearch();
});

function runSearch() {
    //Run an inquirer prompt to ask for the user's desired action
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
            //Based on the selected action, call one of our functions to query the database
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

    connection.query("SELECT employee_id, first_name, last_name, role.tittle, role.salary FROM employee JOIN role ON employee.role_id = role.role_id",
        (err, results) => {
            if (err) throw err;

            results.forEach(element => {

                console.log('employeerID:' + element.employee_id + ' || name: ' + element.first_name + ' || last name: ' + element.last_name + ' || Role: ' + element.tittle + ' || Salary: ' + element.salary)
                
            });
            runSearch();

        }
    )
};


function addEmployee() {
    connection.query("SELECT name FROM department",
        (err, results) => {
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
                        name: "role",
                        message: "what department does the employee works?",
                        type: "rawlist",
                        choices: function () {
                            return results.map(item => {
                                return item.name;
                            });
                        },
                    },
                    {
                        name: "manager",
                        message: "Does the employee has a manager?",
                        type: "list",
                        choices: ["Yes", "No"]
                    }
                ]).then(function (response) {
                    // var name = response.name;
                    // var lastname = response.lastname;
                    console.log(response);
                    connection.query("INSERT INTO employee (first_name, last_name) VALUES ${response.name}, ${response.lastname}",
                         (err, results) => {
                            if (err) throw err;
                            // console.log(results);
                        });


                    if (response.manager === "Yes") {
                        connection.query("SELECT first_name, last_name, employee_id, role_id FROM employee WHERE employee_id IN (SELECT manager_id from employee)",
                            (err, resultsmanager) => {
                                if (err) throw err;
                                console.log(resultsmanager);
                                inquirer
                                    .prompt([
                                        {
                                            name: "managers",
                                            message: "who is the manager?",
                                            type: "rawlist",
                                            choices: function () {
                                                return resultsmanager.map(item => {
                                                    return item.first_name;
                                                });
                                            },
                                        },
                                    ]).then(response)
                                connection.query("UPDATE employee SET ? WHERE ?",
                                    {
                                        first_name:response.managers

                                    },
                                    {
                                        first_name: response.name,
                                        last_name: response.lastname
                                    }, (err, results) => {
                                        if (err) throw err;
                                        console.log(results);
                                    });
                            });
                    } else {
                        console.log("let's do it again");
                        runSearch();
                    };

                    



                }
                )
        });

};

function allEmployees_byDep() {
    connection.query("SELECT name from department",
        (err, results) => {
            if (err) throw err;
            console.log(results);
            inquirer
                .prompt([
                    {
                        name: "department",
                        message: "which department's employee would you like to see?",
                        type: "rawlist",
                        choices: function () {
                            return results.map(item => {
                                return item.name;
                            });
                        },
                    },
                ]).then(function (response) {
                    connection.query("SELECT first_name, last_name from employee JOIN department ON ?",
                        {
                            name: response.department
                        }, (err, results) => {
                            if (err) throw err;
                            results.forEach(element => {
                            console.log('name: ' + element.first_name + ' || last name: ' + element.last_name);
                            
                         });
                         runSearch();
                    });
                
               });
        }                
)};

function  allEmployees_byManager(){
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
                            return "Id " + item.employee_id + " " +item.first_name+ " " + item.lastname;
                        });
                    },
                },    
             
            ]).then(function (response) {
                connection.query("SELECT first_name, last_name, employee_id, role_id FROM employee WHERE ?",
                {
              
                manager_id: response.manager[3]

                },(err, results) => {
                    if (err) throw err;
                    results.forEach(element => {
                        console.log('name: ' + element.first_name + ' || last name: ' + element.last_name);
                        
                     });
                     runSearch();
                    });
                
                });
         }                
 )};

 function updateRole(){
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
                            return item.employee_id + " " + item.first_name + " " + item.last_name+ " " + item.tittle;
                        });
                    },
                },  
                 {
                    name: "newtittle",
                    message:"what role this this employee does now?",
                    type:"rawlist",
                    choices: function () {
                    return results.map(item => {
                        return item.tittle;
                    });
                },
                },
                {
                    name: "newsalary",
                    message:"what is the employee's new salary?",
                    type:"input"

                }  
    
            ]).then(function (response) {
                console.log(response.employee);
                console.log(response.newtittle);
                connection.query("UPDATE role SET ? WHERE ? ",
                {
                tittle:response.newtittle,
                salary:response.newsalary,
                
               role_id:response.employee[0]

                },(err, results) => {
                    if (err) throw err;

                    console.log("role updated");

                    // results.forEach(element => {
                    //     console.log('name: ' + element.first_name + ' || last name: ' + element.last_name);
                        
                    //  });
                     runSearch();
                    });
                
                });
         }                
 )};

function deleteEmployee(){
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
                            return item.employee_id + " " + item.first_name+ " " + item.lastname;
                        });
                    },
                },
            ]).then(function (response) {
                connection.query("DELETE FROM employee WHERE ?",
                {
                    employee_id:response.employeeselected[0]
                },
                (err, results) => {
                    if (err) throw err;
                    console.log("employee deleted"); 
                });
                runSearch();
            });
     }                
)};



 





