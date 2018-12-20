//EXEMPLE DE REQUÊTE

const express = require('express');
const router = express.Router();

module.exports = function(db) {
    /* GET home page. */
    router.get('/', function (req, res, next) { //route
        db.get('SELECT * FROM test WHERE test = 9') //requête
            .then(test => {
                res.render('index', { //utilise un pug (affichage avec un pug)
                    title: 'Express',
                    test: test, //stockage du résultat dans une variable test
                    connected: parseInt(req.signedCookies.connected)
                });
            });
    });

    router.get('/test', function(req, res, next) { //route
        db.all('SELECT * FROM test') //requête
            .then(function(tests) {
                res.send(tests); //on envoie le résultat de la requête (affichage)
            });

        db.run("INSERT INTO test VALUES (9)"); //on ajoute une valeur 9
    });

    return router;
};