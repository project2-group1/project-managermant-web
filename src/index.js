const express = require('express')
const morgan = require('morgan') // log server
const route = require('./routes/index.js') // import route
const session = require('express-session'); // sesstion
const xlsx = require('xlsx')
const handlebars = require('express-handlebars')
const path = require('path') // lib của nodejs để lấy địa chỉ
const app = express()
const port = 3000

app.use(morgan('combined'))

const db = require('./config/db')
// conect db

var assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

// cía này chấp nhận body nè mấy đứa
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}))

app.engine(
    'hbs',
    handlebars.engine({
        defaultLayout: 'main',
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        }
    }),
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'))

route(app)

app.listen(port, () => console.log(`app listening at https://localhost:${port}`))