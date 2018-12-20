const express = require('express');
const router = express.Router();

module.exports = function(db) {
    // Mon accueil
    router.get('/', function (req, res, next) { //définit la route pour accéder à la page accueil de l'association
        res.render('accueil-assos', { //quel template utilisé : ici accueil asso
            title: "accueil association",
            connected: parseInt(req.signedCookies.connected)
        });
    });

    // Mon profil
    router.get('/profil', function (req, res, next) { //définit la route pour accéder à la page profil de l'association
        res.render('profil-association', { //quel template utilisé : ici profil asso
            title: "Mon association",
            connected: parseInt(req.signedCookies.connected)
        });
    });

    return router;
};
