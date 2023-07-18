const express = require('express')
const morgan = require('morgan') // log server
const route = require('./routes/index.js') // import route
const session = require('express-session'); // sesstion
const xlsx = require('xlsx')
const handlebars = require('express-handlebars')
const path = require('path') // lib của nodejs để lấy địa chỉ
const mysql = require('./config/db/index.js');
const multer = require('multer'); // middleware để đọc json

const app = express()
const port = 3000
const bodyParser = require('body-parser');// middleware để đọc json

const upload = multer();
app.use(upload.any());

app.use(morgan('combined'))


var assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

// cía này chấp nhận body nè mấy đứa
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(bodyParser.json());

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}))

const monthMapping = {
    jan: '01',
    feb: '02',
    mar: '03',
    apr: '04',
    may: '05',
    jun: '06',
    jul: '07',
    aug: '08',
    sep: '09',
    oct: '10',
    nov: '11',
    dec: '12',
}

// Template Engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            getGroupName: group => 'Group ' + group % 100,
            getMeetingSerial: meeting => meeting % 100,
            formatDate: dateTime => {
                let y = dateTime.toString().substring(11,15)
                let m = dateTime.toString().substring(4,7).toLowerCase()
                m = monthMapping[m]
                let d = dateTime.toString().substring(8,10)

                return (y + '-' + m + '-' + d)
            } ,
            formatTime: dateTime => {
                let h = dateTime.toString().substring(16,18)
                let m = dateTime.toString().substring(19,21)

                return (Number)(h) + (m == 30 ? '.5' : '')
            },
            formatDisplayTime: (startTime, endTime) => {
                let h_st = startTime.toString().substring(16,18)
                let m_st = startTime.toString().substring(19,21)
                let h_et = endTime.toString().substring(16,18)
                let m_et = endTime.toString().substring(19,21)
                let st = (Number)(h_st) + (m_st == 30 ? ':30' : ':00')
                let et = (Number)(h_et) + (m_et == 30 ? ':30' : ':00')

                return st + ' - ' + et
            },
        }
    }),
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'))

route(app)

app.listen(port, () => console.log(`app listening at https://localhost:${port}`))