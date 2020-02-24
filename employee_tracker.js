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
                runSearch();
            });

        }
    )
};

function rolePicker() {

    connection.query("SELECT name FROM department",
        (err, results) => {
            if (err) throw err;
            console.log(results);

            // results.forEach(element => {
            inquirer
                .prompt([
                    {
                        name: "roleoptions",
                        type: "rawlist",
                        choices: function () {
                            return results.map(item => {
                                return item.item_name;
                            });
                        },
                         message: "what is the employee role?"
                   
                    }
            
          
                ])


        });
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
                        type:"input",
                        message: "what is the employee name?"
                    },
                    {
                        name: "lastname",
                        type:"input",
                        message: "what is the employee last name?",
                    },
                    {
                        name: "role",
                        message: "what is the employee role?",
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
                    if (response.manager === "yes") {
                     connection.query("SELECT first_name, last_name FROM employee WHERE employee_id IN (SELECT manager_id from employee)",
                        (err, results) => {
                           if (err) throw err;
                            console.log(results);
                        inquirer
                            .prompt([
                                {
                                    name: "managers",
                                    message: "who is the manager?",
                                    type: "rawlist",
                                    choices: function () {
                                         return results.map(item => {
                                            return item.first_name;
                                        });
                                    },
                                }



                        inquirer
                        .prompt([
                            {
                                name: "name",
                                type:"input",
                                message: "what is the employee name?"
                            },


                    }

                    connection.query("SELECT position, year, song FROM Top5000 WHERE ?",
                        {
                            artist: response.artist

                        }, (err, results) => {
                            if (err) throw err;

                            results.forEach(element => {

                                // console.log( 'position: ${element.position} || year: ${ element.year }|| song: ${ element.song} ')
                                // ${ element.position }
                            });

                        }
                    )
                });
        });
    };