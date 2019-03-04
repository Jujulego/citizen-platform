//EXEMPLE DE REQUÊTE

const express = require('express');
const router = express.Router();

module.exports = function(db) {
    /* GET home page. */
    router.get('/', function (req, res, next) { //
        db.all("select titre, lieu, description, min(dateMission) as dateMission\n" +
            "  from mission\n" +
            "    inner join dateMission on mission.idMission = dateMission.idMission and dateMission >= date('now')\n" +
            "  group by titre, lieu, description\n" +
            "  order by dateMission\n" +
            "  limit 5")
            .then(function(missions) {
                res.render('index', { //utilise un pug (affichage avec un pug)
                    title: 'Express',
                    missions: missions
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