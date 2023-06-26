const mysql = require('mysql');

var con = mysql.createConnection({
    host: "sql.freedb.tech",
    port: "3306",
    user: "freedb_sql12628666",
    password: "3CjwD6?vZhhRRVA",
    database: "freedb_project_ii"
});


try {
    con.connect();
    console.log('Connect successfully!!!');
} catch (error) {
    console.log('Connect failure!!!');
}

module.exports = con;
