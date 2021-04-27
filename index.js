const orm = require('./orm');
const inquirer = require("inquirer");
const seeTable = require('console.table');

const start = () => {
    console.log("Welcome to Employee Tracker");
    menu ();
};

const finish = () => {
    console.log("Thank you for using Employee Tracker");
    process.exit(1);
};

const menu = () => {
    inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'option',
            choices: ['View Employees', 'View Roles', 'View Departments', 'Add Employee', 'Add Role', 'Add Department', 'Delete Employee', 'Exit'],
        },
    ])
    .then (response => {
        switch (response.option) {
            case "View Employees": viewEmployees();
            break;
            case "View Roles": viewRoles();
            break;
            case "View Departments": viewDepartments();
            break;
            case "Add Employee": addEmpolyee();
            break;
            case "Add Role": addRole();
            break;
            case "Add Department": addDepartment();
            break;
            case "Delete Employee": deleteEmployee();
            break;
            case "Exit": finish();
            break;
        }
    });
};

const viewEmployees = () => {
    orm.getEmployees(response => {
        if (!response.length) {
            console.log("No Employees");
        }
        else console.table(response);
        menu();
    });
};

const viewRoles = () => {
    orm.getRoles(response => {
        if (!response.length) {
            console.log("No Roles");
        }
        else console.table(response);
        menu();
    });
};

const viewDepartments = () => {
    orm.getDepartments(response => {
        if (!response.length) {
            console.log("No Departments");
        }
        else console.table(response);
        menu();
    });
};

const addEmpolyee = () => {
    orm.getRoles(roles => {
        if (!roles.length) {
            console.log("Please create a role first");
            return menu();
        }
        orm.getEmployees(emps => {
            inquirer
            .prompt([{
                message: "First name of new employee?",
                name: "first_name"
            },
            {
                message: "Last name of new employee?",
                name: "last_name"
            },
            {
                message: "Role for new employee?",
                name: "role",
                type: "list",
                choices: roles.map(r => r.id + ": " + r.title)
            },
            {
                message: "Manager for new employee?",
                name: "manager",
                type: "list",
                //have to have the possibilty of no manager.
                choices: emps.map(e => e.id + ": " + e.first_name + " " + e.last_name).concat(["null"])
            }])
            .then (response => {
                response.role_id = response.role.slice(0, response.role.indexOf(":"));
                if (response.manager === "null") {
                    response.manager_id = 0
                }
                else {
                    response.manager_id = response.manager.slice(0, response.manager.indexOf(":"))
                }
                orm.addEmpolyee (response, () => {
                    viewEmployees();
                });
            });
        });
    });
};

//role needs at least 1 department to work 
const addRole = () => {
    orm.getDepartments(dpts => {
        if (!dpts.length) {
            console.log("Please create a department first")
            return menu()
        }
        inquirer
        .prompt (
            [{
                message: "Title of new role?",
                name: "title"
            },
            {
                message: "Salary for new role?",
                name: "salary"
            }, {
                message: "For which department?",
                name: "department",
                type: "list",
                //takes every object of dtps and converts into a string where it will have the id number of : name.
                //map takes in each element of an array and spits out new array based on the objects you want to convert.
                choices: dpts.map(d => d.id + ": " + d.name)
            }
        ])
        .then (response => {
            //extracting id from department string. 
            response.department_id = response.department.slice(0, response.department.indexOf(":"));
            orm.addRole(response, () => {
                viewRoles ();
            });
        });
    });
};

const addDepartment = () => {
    inquirer
        .prompt({
            message: "Name of the New Department?",
            name: "name"
    })
    .then (response => {
        orm.addDepartment(response, () => {
            viewDepartments();
        });
    });
};


const deleteEmployee = () => {
    orm.getEmployees(emps => {
        inquirer
        .prompt({
            message: "Which employee do you want to delete?",
            name: "name",
            type: "list",
            choices: emps.map(e => e.id + ": " + e.first_name + " " + e.last_name)
        })
        .then (response => {
            id = response.name.slice(0, response.name.indexOf(":"));
            orm.deleteEmployee(id, () => {
                viewEmployees();

            });
        });
    });   
};

start();