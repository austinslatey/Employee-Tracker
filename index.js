//Imports
const path = require('path');
const fs = require('fs');
const mysql2 = require('mysql2');
const inquirer = require('inquirer');
const util = require('util');
const { get } = require('http');
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
//get id of employee
// const getEmployeeId = (employee) => {
//     return employee.split(" ")[0];
// }

//inquirer list

// turn array of object to array string
// listOfStringsFromArray = (results) => {
//     let arrayList = [];

//     results = query("SELECT id, first_name, last_name FROM employees");
//     results.forEach(obj => {
//         const object = Object.values(obj).join(" ");
//         arrayList.push(object);
//     });
//     return arrayList;
// }

// get all available departments row's from list
// const getDepts = async () => {
//     try {
//         let deptRows = await query("SELCET * FROM dept");
//         return listOfStringsFromArray(deptRows);
//     } catch (error) {
//         throw error;
//     }
// }

// get all available rows

//get list of employees
getEmployeeList = async () => {
    let employeeList = [];
    try {
        const results = await query("SELECT * FROM dept");
        employeeList = listOfStringsFromArray(results);

    } catch (error) {
        throw error;
    }
    return employeeList;
}

//main functions

//remove employee
const removeExistingEmployee = async () => {
    const existingEmployee = getEmployeeList();
    return inquirer.prompt([
        {
            type: "list",
            name: "employee",
            choices: existingEmployee,
            message: "Which employee is leaving us behind?"
        }
    ])
        .then((entered) => {
            const deleteId = entered.employee.split(" ")[0];
            console.log(deleteId);
            connection.query("DELETE FROM employees WHERE id = ?", deleteId, (err, result) => {
                if (err) throw err;
            });
            getUserChoice();
        });
}

//add employee
//inquirer input

const addNewEmployee = async () => {
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
            type: "list",
            name: "roles",
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
            type: "input",
            name: "manager role",
            message: "Who's the manager to this employee?"
        }
    ]).then((entered) => {
        const role_id = getIdByRole(entered.roles);
        const manager_id = getIdByManager();
        console.log(role_id, manager_id, entered);
        connection.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
            [entered.first_name, entered.last_name, role_id, manager_id], (err, result) => {
                console.log("Added into employees ", result);
                getUserChoice();
                if (err) throw err;
            });
    })
};

//add new role
const addNewRole = async () => {
    try {
        inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is the name of the new role?"
            },
            {
                type: "input",
                name: "income",
                message: "How much income does this role make annually?"

            },
            {
                type: "input",
                name: "id",
                message: "What is the department id?"
            }
        ]);
        let answers = await query("INSERT INTO role (title, income, dept_id) VALUES (?,?,?)",
        [answers.title, answers.income, answers.id], (err, result) => {
            console.log("Added into roles ", result);
            getUserChoice();
            console.log(err)
        });
        
       
    } catch (err) {
        console.log(err);
    }
}



getIdByRole = (roles) => {
    let roleIdValue;
    switch (roles) {

        case "Service Advisor":
            roleIdValue = 1;
            break;
        case "Service Writer":
            roleIdValue = 2;
            break;
        case "Lead Mechanic":
            roleIdValue = 3;
            break;
        case "Spray Technician":
            roleIdValue = 4;
            break;
        case "Account Manager":
            roleIdValue = 5;
            break;
        case "Accountant":
            roleIdValue = 6;
            break;
        case "Legal Lead":
            roleIdValue = 7;
            break;
        default:
            roleIdValue = 0;

    }
    return roleIdValue;
}

const getIdByManager = () => {
    return 2;
}

//view all employees
const viewTheStaff = async () => {
    let employeesRows = await query(`SELECT employees.id id,
    employees.first_name first_name,
    employees.last_name last_name,
    role.title title,
    dept.name dept,
    role.income income
    FROM employees
    INNER  JOIN role ON employees.role_id = role.id
    INNER JOIN dept
    ON role.dept_id = dept.id; `);
    console.table(employeesRows);
    getUserChoice();
}
const viewDepts = async () => {
    let departments = await query(`SELECT * FROM dept`);
    console.table(departments);
    getUserChoice();

}

const getRole = async () => {
    let role = await query(`SELECT * FROM role`);
    console.table(role);
    getUserChoice();
}

//add a new dept
const addNewDepartment = async () => {
    try {
        const answers = await inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is the name of the new department?"
            }
        ]);
        let department = await query(`INSERT INTO dept SET ?`, answers);
        console.log(department);
        getUserChoice();
    } catch (err) {
        console.log(err);
    }
}


//view employees
const getUserChoice = () => {
    inquirer.prompt([{
        name: "choice",
        type: "list",
        message: "What do you want to do?",
        choices: [
            "Select All Employees",
            "Select All Departments",
            "Select All Roles",
            //"Select Employees By Department",
            //"Select Employees By Manager",
            "Add A New Employee",
            "Add A New Department",
            "Add A New Role",
            //"Remove An Existing Employee",
            "Update An Existing Employee's Role",
            //"Update Employee To Manager",
            "Close Window"
        ]
    }])
        .then((entered) => {
            switch (entered.choice) {
                case "Select All Employees":
                    viewTheStaff();

                    break;
                case "Select All Roles":
                    getRole();
                    break;
                case "Select All Departments":
                    viewDepts();
                    break;
                case "Select Employees By Department":
                    break;
                case "Select Employees By Manager":
                    break;
                case "Add A New Employee":
                    addNewEmployee();
                    break;
                case "Add A New Department":
                    addNewDepartment();
                    break;
                case "Add A New Role":
                    addNewRole();
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





//update manager
//view by manager






//Menu






const onceConnected = () => {
    getUserChoice();
}