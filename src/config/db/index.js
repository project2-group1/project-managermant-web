const mysql = require('mysql');

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "project_ii_ver01"
});


try {
    con.connect();
    console.log('Connect successfully!!!');
} catch (error) {
    console.log('Connect failure!!!');
}

module.exports = con;
