const mysql = require("mysql");
const con = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'employee_manager',
});

con.connect(err => {
    if (err) throw err;
    console.log("Database Connected");
});

module.exports = con;