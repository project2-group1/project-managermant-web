const express = require('express')
const morgan = require('morgan') // log server
const route = require('./routes/index.js') // import route
const handlebars = require('express-handlebars')
const path = require('path') // lib của nodejs để lấy địa chỉ
const mysql = require('./config/db/index.js');
const app = express()
const port = 3000

app.use(morgan('combined'))


var assetsPath = path.join(__dirname, 'public');

app.use(express.static(path.join(__dirname, 'public')));

// Template Engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            getGroupName: group => 'Group ' + group % 100,
            getMeetingSerial: meeting => meeting % 100,
        }
    }),
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'))

route(app)

app.listen(port, () => console.log(`app listening at https://localhost:${port}`))