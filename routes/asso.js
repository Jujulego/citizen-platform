const express = require('express');
const router = express.Router();

module.exports = function(db) {
    // Mon accueil
    router.get('/', function (req, res, next) {
        res.render('accueil-assos', {
            title: "accueil association",
            connected: parseInt(req.signedCookies.connected)
        });
    });

    // Mon profil
    router.get('/', function (req, res, next) {
        res.render('profil-association', {
            title: "Mon association",
            connected: parseInt(req.signedCookies.connected)
        });
    });

    return router;
};
