// Importations
import { Router } from "express";

import Association from "../db/Association";
import Citoyen from "../db/Citoyen";
import utils from "../utils";

// Router
export default function(db) {
    const router = Router();

    // mon profil
    router.get('/', utils.user_guard(async function(req, res, next) { //route
        const user = await Citoyen.getLoggedInUser(db, req);
        console.log(user);
        console.log(await user.getCompetances());

        res.render('profil-benevole', { //lien entre la route et le pug profil
            title: "Mon Profil",

            user: user,
            documents:           await user.getDocuments(),
            domaineintervention: await user.getDomainesIntervention(),
            competances:         await user.getCompetances(),
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
                Citoyen.authenticate(db, req, req.body)
                    .then(function(user) {
                        if (user) {
                            res.redirect("/");
                        } else {
                            req.session.connectionPopup = req.body.login;
                            res.redirect("/");
                        }
                    }).catch(next);

                break;

            case "a": // => Association
                Association.authenticate(db, req, req.body)
                    .then(function(asso) {
                        if (asso) {
                            res.redirect("/asso");
                        } else {
                            req.session.connectionPopup = req.body.login;
                            res.redirect("/");
                        }
                    }).catch(next);

                break;
        }
    });

    router.get('/deconnexion', utils.login_guard(async function(req, res, next) {
        // Déconnexion
        Association.disconnect(req);
        Citoyen.disconnect(req);

        res.redirect("/");
    }));

    return router;
};
