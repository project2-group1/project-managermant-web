const mysql = require('mysql');

var con = mysql.createPool({
    host: "sql.freedb.tech",
    port: "3306",
    user: "freedb_sql12628666",
    password: "3CjwD6?vZhhRRVA",
    database: "freedb_project_ii"
});

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
