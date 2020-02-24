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
          allEmployees_byManag();
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
  inquirer
    .prompt([
      {
        name: "artist",
        message: "What artist'song would you like to see?"
      }
    ]).then(function (response) {
      connection.query("SELECT position, year, song FROM Top5000 WHERE ?",
        {
          artist: response.artist

        }, (err, results) => {
          if (err) throw err;
        
          results.forEach(element => {

            console.log( 'position: ${element.position} || year: ${ element.year }|| song: ${ element.song} ')
            ${element.position}
          });
          
        }
      )
      

    })
};




function multiSearch() {
  inquirer
    .prompt([
      {
        name: "artist",
        message: "What artist would you like to search?"
      }
    ]).then(function (response) {
      var query = connection.query("SELECT * FROM Top5000 WHERE ?",
        {
          artist: response.artist

        }, (err, results) => {
          if (err) throw err;


          console.log(results);
        }
      )
    })
};

