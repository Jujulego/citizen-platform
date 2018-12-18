// Dépendances
const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');

const sqlite3 = require("sqlite3").verbose();

// Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
const assosRouter = require('./routes/asso');

// Init Database
const database = new sqlite3.Database("db.sqlite", sqlite3.OPEN_READWRITE,
    err => {
        if (err) {
            console.error("Impossible de se connecter à la base de données.")
        } else {
            console.log("Connecté à la base de données")
        }
    });

// Init Express
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// - templates
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

// - middlewares
app.use(cookieParser('u4uzco6j485vpjfdyyvr0n0l0mp5fewu9o24rrjl'));
app.use(session({
    secret: 'u4uzco6j485vpjfdyyvr0n0l0mp5fewu9o24rrjl',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true,
    prefix: '/static'
}));

// - routes
app.use('/vendor',  express.static(path.join(__dirname, 'node_modules')));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter(database));
app.use('/user', usersRouter(database));
app.use('/asso', assosRouter(database));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
