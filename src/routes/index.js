// Importations
import { Router } from 'express';
import Mission from '../db/Mission';
import Citoyen from "../db/Citoyen";

// Router
export default function(db) {
    const router = Router();

    /* GET home page. */
    router.route('/')
        .get(function (req, res, next) {
            Mission.nextMissions(db)
                .then(function (missions) {
                    res.render('index', { //utilise un pug (affichage avec un pug)
                        title: 'Express',
                        missions: missions
                    });
                });
        })
        .post(function(req, res) {
            // Paramètres
            const { lieu } = req.body;
            const { assos } = req.body;
            const { keyword } = req.body;

            Mission.nextMissions(db, lieu, assos, keyword)
                .then(function (missions) {
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
                values: {}
            });
        })
        .post(async function(req, res, next) {
            // Valeurs
            const { nom, prenom, login, mdp, situation, tel, permis, adresse } = req.body;

            // Validation
            if (!nom || !prenom || !login || !mdp) {
                res.render("inscription", {
                    title: "Inscription",
                    values: { nom, prenom, login, situation, tel, permis, adresse }
                });
            } else {
                try {
                    let cit = await Citoyen.getByLogin(db, login);
                    if (cit == null) {
                        cit = await Citoyen.create(db, {
                            nom: nom,
                            prenom: prenom,
                            loginCitoyen: login,
                            mdpCitoyen: mdp,
                            situation: situation,
                            tel: tel,
                            permis: (permis === "on"),
                            adresse: adresse
                        });

                        cit.authenticate(req);
                        res.redirect("/user/");

                    } else {
                        res.render("inscription", {
                            title: "Inscription",
                            loginExists: true,
                            values: { nom, prenom, login, mdp, situation, tel, permis, adresse }
                        });
                    }
                } catch(err) {
                    console.error(err);
                    next(err);
                }
            }
        });

    //missions
    router.get('/mission/:id', async function(req, res, next) {
        const mission = await Mission.getById(db, req.params.id);

        res.render("read-mission", {
            title: mission.titre,
            asso: await mission.association.get(),
            mission: mission,
            creneaux : await mission.getCreneaux(),
            candidats: await mission.getPostulants(),
            domaines : await mission.getDomaines()
        });
    });

    router.get('/datatable.lang', function(req, res) {
        res.json({
            "sProcessing":     "Traitement en cours...",
            "sSearch":         "Rechercher&nbsp;:",
            "sLengthMenu":     "Afficher _MENU_ &eacute;l&eacute;ments",
            "sInfo":           "Affichage de l'&eacute;l&eacute;ment _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
            "sInfoEmpty":      "Affichage de l'&eacute;l&eacute;ment 0 &agrave; 0 sur 0 &eacute;l&eacute;ment",
            "sInfoFiltered":   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
            "sInfoPostFix":    "",
            "sLoadingRecords": "Chargement en cours...",
            "sZeroRecords":    "Aucun &eacute;l&eacute;ment &agrave; afficher",
            "sEmptyTable":     "Aucune donn&eacute;e disponible dans le tableau",
            "oPaginate": {
                "sFirst":      "Premier",
                "sPrevious":   "Pr&eacute;c&eacute;dent",
                "sNext":       "Suivant",
                "sLast":       "Dernier"
            },
            "oAria": {
                "sSortAscending":  ": activer pour trier la colonne par ordre croissant",
                "sSortDescending": ": activer pour trier la colonne par ordre d&eacute;croissant"
            },
            "select": {
                "rows": {
                    _: "%d lignes séléctionnées",
                    0: "Aucune ligne séléctionnée",
                    1: "1 ligne séléctionnée"
                }
            }
        });
    });

    return router;
};
