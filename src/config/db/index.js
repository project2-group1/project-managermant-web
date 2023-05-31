const mysql = require('mysql');

async function connect() {
    var con = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "project_ii"
    });

    try {
        await con.connect(function (err) {
            if (err) throw err;
            con.query("SELECT * FROM student", function (err, result, fields) {
                if (err) throw err;
                console.log(result);
            });
        });
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
}
module.exports = { connect };
