const express = require('express')
const morgan = require('morgan') // log server
const route = require('./routes/index.js') // import route
const handlebars = require('express-handlebars')
const path = require('path') // lib của nodejs để lấy địa chỉ
const mysql = require('mysql');
const app = express()
const port = 3000

app.use(morgan('combined'))

const db = require('./config/db')
// conect db

var assetsPath = path.join(__dirname, 'public');

app.use(express.static(path.join(__dirname, 'public')));

// Template Engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        }
    }),
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'))

// Connect Database
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

route(app)

app.listen(port, () => console.log(`app listening at https://localhost:${port}`))