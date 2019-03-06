//EXEMPLE DE REQUÊTE

const express = require('express');
const router = express.Router();

module.exports = function(db) {
    /* GET home page. */
    router.get('/', function (req, res, next) { //
        db.all("select titre, lieu, description, min(cm.debut) as dateMission\n" +
                "  from mission as m\n" +
                "    inner join creneau_mission as cm on m.idMission = cm.mission and cm.debut >= date('now')\n" +
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