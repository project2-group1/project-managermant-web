const express = require('express')
const morgan = require('morgan') // log server
const route = require('./routes/index.js') // import route
const handlebars = require('express-handlebars')
const path = require('path') // lib của nodejs để lấy địa chỉ
const app = express()
const port = 3000

app.use(morgan('combined'))

const route = require('./routes');
const db = require('./config/db')
// conect db
db.connect()
var assetsPath = path.join(__dirname, 'public');

app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        }
    }),
)
app.set('view engine','hbs')
app.set('views', path.join(__dirname, 'resources/views'))

route(app)

app.listen(port, () => console.log(`app listening at https://localhost:${port}`))