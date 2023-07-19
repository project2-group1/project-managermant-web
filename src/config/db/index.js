const mysql = require('mysql');

var con = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "project_ii_ver06"
})

con.on("connection", connection => {
    console.log("Database connected!");

    connection.on("error", err => {
        console.error(new Date(), "MySQL error", err.code);
    });

    connection.on("close", err => {
        console.error(new Date(), "MySQL close", err);z
    });
});

module.exports = con;
