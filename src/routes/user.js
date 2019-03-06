// Importations
import { Router } from 'express';

import Association from "../db/Association";
import Citoyen from "../db/Citoyen";
import utils from '../utils';

// Router
export default function(db) {
    const router = Router();

    // mon profil
    router.get('/', utils.login_guard(function(req, res, next) { //route
        // Informations pour le permis
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
            return;
        }

        // Récupération des paramètres
        switch (req.body.type) {
            case "c": // => Citoyen
                Citoyen.authenticate(db, req.body)
                    .then(function(user) {
                        if (user) {
                            req.session.connected = true;
                            req.session.user = user;
                            res.redirect("/");
                        } else {
                            req.session.connectionPopup = req.body.login;
                            res.redirect("/");
                        }
                    }).catch(next);

                break;

            case "a": // => Association
                Association.authenticate(db, req.body)
                    .then(function(asso) {
                        if (asso) {
                            req.session.connected = true;
                            req.session.asso = asso;
                            res.redirect("/asso");
                        } else {
                            req.session.connectionPopup = req.body.login;
                            res.redirect("/");
                        }
                    }).catch(next);

                break;
        }
    });

    router.get('/deconnexion', utils.login_guard(function(req, res, next) {
        // Déconnexion
        req.session.connected = false;
        req.session.user = undefined;
        req.session.asso = undefined;

        res.redirect("/");
    }));

    return router;
};
