// Importations
import { Router } from 'express';
import Mission from '../db/Mission';

// Router
export default function(db) {
    const router = Router();

    /* GET home page. */
    router.get('/', function (req, res, next) {
        Mission.nextMissions(db)
            .then(function (missions) {
                res.render('index', { //utilise un pug (affichage avec un pug)
                    title: 'Express',
                    missions: missions
                });
            });
    });

    router.route('/inscription')
        .get(function(req, res, next) {
            res.render("inscription", {
                title: "Inscription",
                test: "ewzdtcrgbn,kl;m",
            });
        })
        .post(function(req, res, next) {
            res.render("inscription");
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