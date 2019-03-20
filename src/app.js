//Gère tout ce qui concerne le serveur
// TOUTES LES ROUTES : SEUL TRUC QUI NOUS INTERESSE ICI
// Dépendances
import Promise from "bluebird";
import cookieParser from "cookie-parser";
import createError from "http-errors";
import express from "express";
import morgan from "morgan";
import path from "path";
import sassMiddleware from "node-sass-middleware";
import session from "express-session";
import sqlite from "sqlite/legacy";

// Routes
import indexRouter from './routes/index'; // routes pour la page d'accueil
import usersRouter from './routes/user';  // routes pour la page utilisateur
import assosRouter from './routes/asso';  // routes pour la page asso

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
    src: path.join(__dirname, '../public'),
    dest: path.join(__dirname, '../public'),
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true,
    prefix: '/static'
}));

// Init Database
Promise.resolve()
    .then(() => sqlite.open("./db.sqlite", { Promise }))
    .then(db => db.migrate())
    .then(function(db) {
        // - ressources
        app.use('/vendor', express.static(path.join(__dirname, '../node_modules')));
        app.use('/static', express.static(path.join(__dirname, '../public')));
        app.use('/media',  express.static(path.join(__dirname, '../media')));

        // - middlewares
        app.use(async function(req, res, next) {
            // Permet d'accéder à la session depuis le pug
            res.locals.session = req.session;

            next();
        });

        app.use(function (req, res, next) {
            // Erreur de connection
            res.locals.connectionPopup = {
                err: (req.session.connectionPopup !== undefined),
                email: req.session.connectionPopup,
            };

            req.session.connectionPopup = undefined;

            next();
        });

        // - routes
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

        console.log("Listening at http://localhost:3000/")
    });

module.exports = app;
