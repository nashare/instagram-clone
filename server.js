const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

const indexRoutes = require('./routes/index');

const app = express();

app.set('view engine', 'ejs');
require('dotenv').config();
require('./config/database');

app.use(logger('dev'));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use('/', indexRoutes);

app.listen(3000, () => {
    console.log('express is listening on port:3000');
});