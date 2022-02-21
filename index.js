//Imports
const path = require('path');
const fs = require('fs');
const mysql2 = require('mysql2');
const inquirer = require('inquirer');
const util = require('util');
//const Connection = require('mysql2/typings/mysql/lib/Connection');





   

//establish connection
let connection = mysql2.createConnection(
   {
    host: 'localhost',
    port: 3306,
    // Your MySQL username,
    user: 'austins',
    // Your MySQL password
    password: 'austinsgeneric',
    database: "employees_db"
  }
);

//promisfy query connection
const query = util.promisify(connection.query).bind(connection);



//connection function serving as a response for console
connection.connect(function (err) {
    if (err) console.log(err);
    console.log(`database connected ${connection.threadId}`);
    onceConnected();
});



//helper functions

    //inquirer
    

        //inquirer input
        //const user

        //inquirer list

        // turn array of object to array string

    //get list of employees
    
    // get all available departments

    // get all available rows


//main functions

    //remove employee

    //add employee
    const addNewEmployee = () => {
        return inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What's the first name of the employee?"
        }, 
        {
            type: "input",
            name: "last_name",
            message: "What's the last name of the employee?"    

        },
        {
            type: "roles",
            name: "list",
            message: "What role does this employee have?",
            choices: [
                "Service Advisor",
                "Service Writer",
                "Lead Mechanic",
                "Spray Technician",
                "Account Manager ",
                "Accountant",
                "Legal Lead",
            ]
        },
        {
            type:"input",
            name:"manager role",
            message:"Who's the manager to this employee?"
        }
    ]).then((entered) => {
        const role_id = getIdRole(entered.roles);
        const manager_id = getIdManager();
        connection.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", 
        [entered.first_name, entered.last_name, role_id, manager_id], (err, result) => {
           console.log(result) 
           console.log(err);
        } );
    })
    }

    //view employees
    const getUserChoice = () => {
        inquirer.prompt([{
            name: "choice",
            type: "list",
            message: "What do you want to do?",
            choices: [
                "Select All Employees",
                "Select Employees By Department",
                "Select Employees By Manager",
                "Add A New Employee",
                "Remove An Existing Employee",
                "Update An Existing Employee's Role",
                "Update Employee To Manager",
                "Close Window"
            ]
        }])
        .then((entered) => {
            switch (entered.choice) {
                case "Select All Employees":
                    break;
                case "Select Employees By Department":
                    break;
                case "Select Employees By Manager":
                    break;
                case "Add A New Employee":
                    addNewEmployee();
                    break;
                case "Remove An Existing Employee":
                    removeExistingEmployee();
                    break;
                case "Update An Existing Employee's Role":
                    break;
                case "Update Employee To Manager":
                    break;
                case "Close Window":
                    connection.end();
                    break;
            }
        });
    }

    // inquirer prompt to view depts
        //view employees given a dept

//update employee role

//update manager
    //view by manager


//add a new dept

//add new role

//Menu






const onceConnected = () => {
    getUserChoice();
}