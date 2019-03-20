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

    router.get('/test', function(req, res, next) { //route
        db.all('SELECT * FROM test') //requête
            .then(function(tests) {
                res.send(tests); //on envoie le résultat de la requête (affichage)
            });

        db.run("INSERT INTO test VALUES (9)"); //on ajoute une valeur 9
    });

    return router;
};