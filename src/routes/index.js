// Importations
import { Router } from 'express';
import Mission from '../db/Mission';
import Citoyen from "../db/Citoyen";
import Association from "../db/Association";

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
            const { dateDebut } = req.body;
            const { keyword } = req.body;

            Mission.nextMissions(db, lieu, assos, dateDebut, keyword)
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

    return router;
};
