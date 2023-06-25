const mysql = require('mysql');

var con = mysql.createConnection({
    host: "sql12.freesqldatabase.com",
    port: "3306",
    user: "sql12628666",
    password: "CaKEHYPJFX",
    database: "sql12628666"
});


try {
    con.connect();
    console.log('Connect successfully!!!');
} catch (error) {
    console.log('Connect failure!!!');
}

module.exports = con;
