// Importations
import { Router } from 'express';
import Domaine from '../db/Domaine';
import Mission from '../db/Mission';
import Citoyen from "../db/Citoyen";
import Association from "../db/Association";

// Router
export default function(db) {
    const router = Router();

    /* GET home page. */
    router.get('/', async function (req, res, next) {
        try {
            // Paramètres
            const { lieu, assos, dateDebut, domaine, keyword } = req.query;

            const missions = await Mission.nextMissions(db, lieu, assos, dateDebut, domaine, keyword);

            for (let i = 0; i < missions.length; ++i) {
                const m = missions[i];
                m.asso = await Association.getByLogin(db, m.association.pk);

                console.log("Mission : " + m.titre + " Asso : " + m.asso.nom);
            };

            const domaines = await Domaine.allDomaines(db);

            res.render('index', { //utilise un pug (affichage avec un pug)
                title: 'Express',
                missions: missions,
                allAsso: await Association.getAllAsso(db),
                domaines: domaines,
                query: req.query,
            });
        } catch(err) {
            console.log(err);
            next(err);
        }
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

        const creneauxMission = await mission.getCreneaux();
        creneauxMission.forEach((cre) => cre.postule = false);

        const user = await Citoyen.getLoggedInUser(db, req);

        if (user != null) {
            const postulations = await user.getPostulations();

            creneauxMission.forEach((cre) => {
                for (let i = 0; i < postulations.length; ++i) {
                    const p = postulations[i];

                    if (p.creneau.pk === cre.id) {
                        cre.postule = true;
                        cre.postulation = p;
                        break;
                    }
                }
            });
        }


        res.render("read-mission", {
            title: mission.titre,
            asso: await mission.association.get(),
            mission: mission,
            creneaux : creneauxMission,
            domaines : await mission.getDomaines()
        });
    });


    //ProfilAssoRead
    router.get('/profilAsso/:login', async function(req, res, next) {
        const asso = await Association.getByLogin(db, req.params.login);

        res.render('profil-asso-read', { //quel template utilisé : ici profil asso
            title: "Association",
            asso: asso,
        });
    });

    //ProfilCitoyenRead
    router.get('/profilCitoyen/:login', async function(req, res, next) {
        const user = await Citoyen.getByLogin(db, req.params.login);

        res.render('profil-benevole-read', { //quel template utilisé : ici profil asso
            title: "Citoyen",

            user: user,
            documents:   await user.getDocuments(),
            competances: await user.getCompetances(),

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
