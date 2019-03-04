const express = require('express');
const utils = require('../utils');

const router = express.Router();

module.exports = function(db) {
    // Mon accueil
    router.get('/', utils.login_guard(function(req, res, next) { //définit la route pour accéder à la page accueil de l'association
        res.render('accueil-assos', { //quel template utilisé : ici accueil asso
            title: "accueil association"
        });
    }));

    // Mon profil
    router.get('/profil', utils.login_guard(function(req, res, next) { //définit la route pour accéder à la page profil de l'association
        res.render('profil-association', { //quel template utilisé : ici profil asso
            title: "Mon association",

            nom: req.session.asso.nom ,
            mail: req.session.asso.mail,
            tel: req.session.asso.tel,
            adresse: req.session.asso.adresse,
            siteWeb: req.session.asso.siteWeb,
            siret: req.session.asso.siret,
            presentation: req.session.asso.presentation
        });
    }));

    return router;
};
