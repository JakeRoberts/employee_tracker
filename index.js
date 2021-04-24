const orm = require('./orm');
const inquirer = require("inquirer");
const seeTable = require('console.table');

const start = () => {
    console.log("Welcome to Employee Tracker");
    menu ();
};

const finish = () => {
    console.log("Thank you for using Employee Tracker");
};

const menu = () => {
    inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'option',
            choices: ['View Employees', 'View Roles', 'View Departments', 'Exit'],
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
            case "Exit": finish();
            break;
        }
    });
};

const viewEmployees = () => {
    orm.getEmployees(response => {
        console.table(response);
        menu();
    });
};

const viewRoles = () => {
    orm.getRoles(response => {
        console.table(response);
        menu();
    });
};

const viewDepartments = () => {
    orm.getDepartments(response => {
        console.table(response);
        menu();
    });
};

start();