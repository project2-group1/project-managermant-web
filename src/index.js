const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const app = express();
const port = 3000;

const route = require('./routes');
var assetsPath = path.join(__dirname, 'public');

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

// app.use(methodOverride('_method'));
//http logger;
app.use(morgan('combined'));

// template engine
app.engine(
    'hbs',
    handlebars.engine({
        defaultLayout: 'main',
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b
        }
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Route init
route(app);

app.listen(port, () => console.log(`Example app listening at ${port}`));
