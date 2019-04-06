// Importations
import { Router } from "express";

import Mission from "../db/Mission";
import Postulation from '../db/Postulation';
import Association from "../db/Association";
import Citoyen from "../db/Citoyen";
import CreneauMission from '../db/CreneauMission';
import utils from "../utils";

// Router
export default function(db) {
    const router = Router();

    // mon profil
    router.route('/')
        .get(utils.user_guard(async function(req, res, next) { //route
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
        }))
        // Modification Informations citoyen
        .post(utils.user_guard(async function(req, res, next) {
            // Récups nouv infos
            const { nom, prenom, adresse, tel, situation, permis } = req.body;

            // Modif user
            const user = await Citoyen.getLoggedInUser(db, req);

            let needSave = false;


            if (nom !== user.nom) {
                user.nom = nom;
                needSave = true;
            }

            if(prenom !== user.prenom){
                user.prenom = prenom;
                needSave = true;
            }

            if(adresse !== user.adresse){
                user.adresse = adresse;
                needSave = true;
            }

            if(tel !== user.tel){
                user.tel = tel;
                needSave = true;
            }

            if(situation !== user.situation){
                user.situation = situation;
                needSave = true;
            }

            if(permis !== user.permis){
                user.permis = permis;
                needSave = true;
            }

            if (needSave) {
                user.save()
                    .then(function() {
                        res.redirect("/user");
                    });
            }
        }));

    // mes candidatures
    router.get('/candidatures', utils.user_guard(async function(req, res, next) { //route
        const user = await Citoyen.getLoggedInUser(db, req);
        const postulations = await user.getPostulations();
        const missions = [];

        for (let p of postulations) {
            const c = await p.creneau.get();
            missions.push({
                creneau: c,
                mission: await c.mission.get()
            });
        }

        console.log(missions);

        res.render("candidatures", { //lien entre la route et le pug candidature
            title: "Mes Candidatures",
            missions: missions
        });
    }));

    //supprimer le profil citoyen
    router.post('/supprCitoyen',utils.user_guard(async function(req, res, next) {
        const user = await Citoyen.getLoggedInUser(db, req);
        await user.delete();

        Citoyen.disconnect(req);

        res.redirect("/");
    }));


    //missions
    router.get('/mission/:id', utils.user_guard(async function(req, res, next) {
        const user = await Citoyen.getLoggedInUser(db, req);
        const mission = await user.getMission(req.params.id);

        res.render("read-mission", {
            title: mission.titre,
            asso: await mission.association.get(),
            mission: mission,
            creneaux : await mission.getCreneaux(),
            candidats: await mission.getPostulants()
        });

    }));

    router.post('/postuler', utils.user_guard(async function(req, res, next){
        console.log("dans le postuler");

        const user = await Citoyen.getLoggedInUser(db, req);

        console.log(req.body.check);

        if(typeof req.body.check === 'string'){
            let postu = await Postulation.create(db, {
                citoyen : user,
                creneau : await CreneauMission.getById(db, req.body.check)
            })
        }
        else{
            for (let idcreneauSel of req.body.check ){
                console.log(idcreneauSel);
                let postu = await Postulation.create(db, {
                    citoyen : user,
                    creneau : await CreneauMission.getById(db, idcreneauSel)
                })
            }
        }

        res.redirect("/");
    }));

    // Connexion
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
