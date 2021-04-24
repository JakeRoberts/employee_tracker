const db = require('./db');

const getEmployees = (cb) => {
    const sql = "SELECT * FROM employee";
    db.query(sql, (err, result) => {
        if (err) throw err;
        cb(result);
    });
};

const getRoles = (cb) => {
    const sql = "SELECT * FROM role";
    db.query(sql, (err, result) => {
        if (err) throw err;
        cb(result);
    });
};

const getDepartments = (cb) => {
    const sql = "SELECT * FROM department";
    db.query(sql, (err, result) => {
        if (err) throw err;
        cb(result);
    });
};

const addEmpolyee = (data, cb) => {
    const sql = `Insert Into employee (first_name, last_name, role_id, manager_id) values ("${data.first_name}", "${data.last_name}", "${data.role_id}", "${data.manager_id}")`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        cb(result);
    });
};

const addRole = (data, cb) => {
    const sql = `Insert Into role (title, salary, department_id) values ("${data.title}", "${data.role}", "${data.department_id}")`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        cb(result);
    });
};

const addDepartment = (data, cb) => {
    const sql = `Insert Into department (name) values ("${data.name}")`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        cb(result);
    });
};

const updateEmployee = (data, id, cb) => {
    const sql = `Update employee set ? WHERE id=?`;
    db.query(sql, [data, id], (err, result) => {
        if (err) throw err;
        cb(result);
    });
};

const updateRole = (data, id, cb) => {
    const sql = `Update role set ? WHERE id=?`;
    db.query(sql, [data, id], (err, result) => {
        if (err) throw err;
        cb(result);
    });
};

const updateDepartment = (data, id, cb) => {
    const sql = `Update department set ? WHERE id=?`;
    db.query(sql, [data, id], (err, result) => {
        if (err) throw err;
        cb(result);
    });
};

module.exports = {
    getEmployees, getRoles, getDepartments, addEmpolyee, addRole, addDepartment, updateEmployee, updateRole, updateDepartment
};