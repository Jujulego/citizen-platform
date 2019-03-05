const express = require('express');
const utils = require('../utils');

const router = express.Router();

module.exports = function(db) {
    // Mon accueil
    router.get('/', utils.asso_guard(function(req, res, next) { //définit la route pour accéder à la page accueil de l'association
        db.all("select m.idMission, titre, count(lmc.loginCitoyen) as postulants\n" +
                "  from mission as m\n" +
                "    left join linkMissionCitoyen lmc on m.idMission = lmc.idMission\n" +
                "  where m.loginAsso = ?\n" +
                "  group by m.idMission",
                req.session.asso.loginAsso
            )
            .then(function (missions) {
                res.render('accueil-assos', { //quel template utilisé : ici accueil asso
                    title: "accueil association",
                    missions: missions
                });
            });
    }));

    // Mon profil
    router.get('/profil', utils.asso_guard(function(req, res, next) { //définit la route pour accéder à la page profil de l'association
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

    router.get('/mission/:id', utils.asso_guard(function(req, res, next) {
        db.get("select * from mission where idMission = ? and loginAsso = ?", [req.params.id, req.session.asso.loginAsso])
            .then(function (mission) {
                if (mission !== undefined) {
                    db.all("select c.loginCitoyen, c.nom, c.prenom\n" +
                            "  from citoyen as c\n" +
                            "    inner join linkMissionCitoyen lmc on c.loginCitoyen = lmc.loginCitoyen\n" +
                            "  where lmc.idMission = ?",
                            mission.idMission)
                        .then(function(candidats) {
                            res.render("edit-mission", {
                                title: mission.titre,

                                mission: mission,
                                candidats: candidats
                            });
                        });
                } else {
                    res.status(404).render("404");
                }
            })
            .catch(function (reason) {
                next(reason);
            });
    }));

    return router;
};
