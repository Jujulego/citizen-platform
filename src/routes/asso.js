const express = require('express');
const utils = require('../utils');

const router = express.Router();

module.exports = function(db) {
    // Mon accueil
    router.get('/', utils.login_guard(function(req, res, next) { //définit la route pour accéder à la page accueil de l'association
        res.render('accueil-assos', { //quel template utilisé : ici accueil asso
            title: "accueil association",
            connected: req.session.connected
        });
    }));

    // Mon profil
    router.get('/profil', utils.login_guard(function(req, res, next) { //définit la route pour accéder à la page profil de l'association
        res.render('profil-association', { //quel template utilisé : ici profil asso
            title: "Mon association",
            connected: req.session.connected,


            nom: req.session.asso.nom ,
            mail: req.session.asso.mail,
            tel: req.session.asso.tel,
            adresse: req.session.asso.adresse,
            siteWeb: req.session.asso.siteWeb,
            siret: "A METTRE DANS BDD",
            presentation: "A METTRE DANS BDD : long texte",
            evenement: "A METTRE DANS BDD : sous forme de liste en mode : date + presentation peut etre"


        });
    }));

    return router;
};
