const mysql = require('mysql');

var con = mysql.createConnection({
    host: "sql.freedb.tech",
    port: "3306",
    user: "freedb_sql12628666",
    password: "3CjwD6?vZhhRRVA",
    database: "freedb_project_ii"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});


module.exports = con;
