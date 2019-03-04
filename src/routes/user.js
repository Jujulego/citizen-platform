const express = require('express');
const utils = require('../utils');

const router = express.Router();

module.exports = function(db) {
    // mon profil
    router.get('/', utils.login_guard(function(req, res, next) { //route
        res.render('profil-benevole', { //lien entre la route et le pug profil
            title: "Mon Profil",
            connected: req.session.connected
        });
    }));

    // mes candidatures
    router.get('/candidatures', utils.login_guard(function(req, res, next) { //route
        res.render("candidatures", { //lien entre la route et le pug candidature
            title: "Mes Candidatures",
            connected: req.session.connected
        });
    }));

    router.post('/connexion', function(req, res, next) {
        // Déjà connecté ?
        if (req.session.connected) {
            res.redirect("/");
        }

        // Récupération des paramètres
        const email = req.body.email;
        const mdp = req.body.mdp;
        let rq = "";
        let champ = "";

        switch (req.body.type) {
            case "b": // => Bénévole
                rq = "select loginCitoyen from citoyen where loginCitoyen = ? AND mdpCitoyen = ?";
                champ = "loginCitoyen";
                break;

            case "a": // => Associations
                rq = "select loginAsso from association where loginAsso = ? AND mdpAsso = ?";
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
                            break;

                        case "a": // => Associations
                            req.session.asso = user;
                            break;
                    }
                }

                req.session.save();
                res.redirect("/");
            })
            .catch(function (reason) {
                console.error(reason);
                res.redirect("/?connerr=1&email=" + encodeURI(email));
            });
    });

    router.get('/deconnexion', utils.login_guard(function(req, res, next) {
        req.session.connected = false;
        res.redirect("/");
    }));

    return router;
};
