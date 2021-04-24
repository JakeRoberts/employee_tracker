const orm = require('./orm');

const seeTable = require('console.table');

orm.getDepartments(console.table);

// creating data in the table
// orm.addDepartment({name:"IT"}, console.log);
// orm.getDepartments(console.table);
orm.updateDepartment({name:"R&D"}, 1, console.log);
orm.getDepartments(console.table);