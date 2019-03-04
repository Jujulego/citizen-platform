//Gère tout ce qui concerne le serveur
//TOUTES LES ROUTES : SEUL TRUC QUI NOUS INTERESSE ICI
// Dépendances
const Promise = require("bluebird");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const sassMiddleware = require("node-sass-middleware");
const session = require("express-session");
const sqlite = require("sqlite/legacy");

// Routes
const indexRouter = require('./routes/index'); //route pour la page d'accueil
const usersRouter = require('./routes/user'); //route pour la page utilisateur
const assosRouter = require('./routes/asso'); //route pour la page asso

// Init Express
const app = express();

app.use(morgan('dev'));
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
    saveUninitialized: true
}));
app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true,
    prefix: '/static'
}));

// Init Database
Promise.resolve()
    .then(() => sqlite.open("./db.sqlite", { Promise }))
    .then(db => db.migrate())
    .then(function(db) {
        // - routes
        app.use('/vendor', express.static(path.join(__dirname, '../node_modules')));
        app.use('/static', express.static(path.join(__dirname, '../public')));

        app.use('/', indexRouter(db));
        app.use('/user', usersRouter(db));
        app.use('/asso', assosRouter(db));

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
    });

module.exports = app;
