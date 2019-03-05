const express = require('express');
const utils = require('../utils');

const router = express.Router();

module.exports = function(db) {
    // mon profil
    router.get('/', utils.login_guard(function(req, res, next) { //route

        //Informations pour le permis
        let permisB;
        if (req.session.user.permis) {
            permisB = "Permis B";
        } else {
            permisB = "Pas de permis";
        }

        // Informations pour les Documents
        const requeteDoc = "select titre, lien from document where loginCitoyen = ? ";
        db.all(requeteDoc, req.session.user.loginCitoyen)
            .then(function(documents){

                // Informations pour Dommaine d'Intervention
                const requeteDomInt = "select nom from domaineIntervention where loginCitoyen = ? ";
                db.all(requeteDomInt, req.session.user.loginCitoyen)
                    .then(function(domaines){

                        // Informations Savoir Faire/competance
                        const requeteSF = "select nom, description from competance where loginCitoyen = ?";
                        db.all(requeteSF, req.session.user.loginCitoyen)
                            .then(function(competances){

                                res.render('profil-benevole', { //lien entre la route et le pug profil
                                    title: "Mon Profil",

                                    documents: documents,

                                    domaineintervention:domaines,

                                    competances: competances,

                                    mail: req.session.user.loginCitoyen,
                                    tel: req.session.user.tel,
                                    adresse: req.session.user.adresse,
                                    situation: req.session.user.situation,
                                    permis: permisB
                                });
                            });
                    });
            });
    }));

    // mes candidatures
    router.get('/candidatures', utils.login_guard(function(req, res, next) { //route
        res.render("candidatures", { //lien entre la route et le pug candidature
            title: "Mes Candidatures"
        });
    }));

    router.post('/connexion', function(req, res, next) {
        // Déjà connecté ?
        if (req.session.connected) {
            res.redirect("/");
            return
        }

        // Récupération des paramètres
        const email = req.body.email;
        const mdp = req.body.mdp;
        let rq = "";
        let champ = "";

        switch (req.body.type) {
            case "b": // => Bénévole
                rq = "select * from citoyen where loginCitoyen = ? AND mdpCitoyen = ?";
                champ = "loginCitoyen";
                break;

            case "a": // => Associations
                rq = "select * from association where loginAsso = ? AND mdpAsso = ?";
                champ = "loginAsso";
                break;
        }

        // Requête
        db.get(rq, [email, mdp])
            .then(function(user) {
                if (user[champ] === email) {
                    req.session.connected = true;

                    switch (req.body.type) {
                        case "b": // => Bénévole
                            req.session.user = user;
                            res.redirect("/");
                            break;

                        case "a": // => Associations
                            req.session.asso = user;
                            res.redirect("/asso");
                            break;
                    }
                }
            })
            .catch(function (reason) {
                console.error(reason);

                req.session.connectionPopup = email;
                res.redirect("/");
            });
    });

    router.get('/deconnexion', utils.login_guard(function(req, res, next) {
        req.session.connected = false;
        req.session.user = undefined;
        req.session.asso = undefined;

        res.redirect("/");
    }));

    return router;
};
