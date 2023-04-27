const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const passport = require('passport');


const indexRoutes = require('./routes/index');
const profileRoutes = require('./routes/profile');
const photosRoutes = require('./routes/photos');
const commentsRoutes = require('./routes/comments');
const isAuthenticated = require('./config/isAuthenticated');

const app = express();

app.set('view engine', 'ejs');
require('dotenv').config();
require('./config/database');
require('./config/passport');

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
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});

app.use('/', indexRoutes);
app.use('/profile',isAuthenticated, profileRoutes);
app.use('/photos', isAuthenticated, photosRoutes);
app.use('/photos/:id/comments', isAuthenticated, commentsRoutes);

app.use('*', (req, res) => {
    res.render('404', { title: '404 - Page Not Found' });
});


app.listen(process.env.PORT || 4000);
