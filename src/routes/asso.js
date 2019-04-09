// Constructeur
import { Router } from 'express';

import Mission from '../db/mission';
import CreneauMission from '../db/CreneauMission';
import utils from '../utils';
import Association from "../db/Association";
import Domaine from "../db/Domaine";
import Citoyen from "../db/Citoyen";
import Postulation from '../db/Postulation';

// Router
export default function(db) {
    const router = Router();

    // Mon accueil
    router.get('/', utils.asso_guard(async function(req, res, next) { // définit la route pour accéder à la page accueil de l'association
        const asso = await Association.getLoggedInUser(db, req);

        res.render('accueil-assos', { //quel template utilisé : ici accueil asso
            title: "accueil association",
            missions: await asso.getMissions()
        });
    }));

    // Mon profil
    router.get('/profil', utils.asso_guard(async function(req, res, next) { //définit la route pour accéder à la page profil de l'association
        const asso = await Association.getLoggedInUser(db, req);

        res.render('profil-association', { //quel template utilisé : ici profil asso
            title: "Mon association",
            asso: asso,
        });
    }));

    //modifications Informations citoyen
    router.post('/', utils.asso_guard(async function(req, res, next) {
        // Récups nouv infos
        const { nom, adresse, tel, siteWeb, siret } = req.body;

        // Modif user
        const asso = await Association.getLoggedInUser(db, req);

        let needSave = false;


        if (nom !== asso.nom) {
            asso.nom = nom;
            needSave = true;
        }


        if(adresse !== asso.adresse){
            asso.adresse = adresse;
            needSave = true;
        }

        if(tel !== asso.tel){
            asso.tel = tel;
            needSave = true;
        }

        if(siteWeb !== asso.siteWeb){
            asso.siteWeb = siteWeb;
            needSave = true;
        }

        if(siret !== asso.siret){
            asso.siret = siret;
            needSave = true;
        }

        if (needSave) {
            asso.save()
                .then(function() {
                    res.redirect("/asso/Profil");
                });
        }
    }));

    router.post('/mission/:id', utils.asso_guard(async function(req, res, next) {

        // Récups nouv infos
        const { titre, lieu, description, nbPers } = req.body;

        const asso = await Association.getLoggedInUser(db, req);
        const mission = await asso.getMission(req.params.id);

        let needSave = false;

        if(titre !== mission.titre){
            mission.titre = titre;
            needSave = true;
        }

        if(lieu !== mission.lieu){
            mission.lieu = lieu;
            needSave = true;
        }

        if(description !== mission.description){
            mission.description = description;
            needSave = true;
        }

        if(+nbPers !== mission.nbPersAtteindre){
            mission.nbPersAtteindre = nbPers;
            needSave = true;
        }

        const creneaux = await mission.getCreneaux();

        if (needSave) {
            mission.save()
                .then(async function() {
                    res.render("edit-mission", {
                        title: mission.titre,

                        asso: asso,
                        mission: mission,
                        creneaux : creneaux,
                        candidats: await mission.getPostulants(),
                        domaines : await mission.getDomaines()
                    });
                });
        }


    }));

    router.get('/mission/:id', utils.asso_guard(async function(req, res, next) {
        const asso = await Association.getLoggedInUser(db, req);
        const mission = await asso.getMission(req.params.id);

        const creneaux = await mission.getCreneaux();


        res.render("edit-mission", {
            title: mission.titre,

            asso: asso,
            mission: mission,
            creneaux : creneaux,
            candidats: await mission.getPostulants(),
            domaines : await mission.getDomaines()
        });

    }));

    //Création de missions
    router.get('/createMission', utils.asso_guard(async function(req, res, next) {
        const asso = await Association.getLoggedInUser(db, req);

        res.render('createMission', {
            title: "Creation Mission",
            asso: asso,
        });
    }));

    router.post('/createMission', utils.asso_guard(async function(req, res, next) {
        // Récups nouv infos
        const { titre, lieu, description, nbPers, dateDebut, timeDebut, ecart, dateFin, timeFin, repetitions, domaine } = req.body;
        const asso = await Association.getLoggedInUser(db, req);

        // Validation
        if (!titre || !lieu || !description || !dateDebut || !timeDebut || !dateFin || !timeFin) {
            res.render('createMission', {
                title: "Creation Mission",
                asso: asso,
            });
        } else {
            try {
                //mission
                const mission = await Mission.create(db,
                    { titre, lieu, description, asso, nbPersAtteindre: nbPers || 0}
                );

                // Dates
                const debut = new Date(dateDebut + " " +  timeDebut);
                const fin = new Date(dateFin + " " + timeFin);

                // Créneau
                await CreneauMission.create(db, { debut, fin, repetitions, ecart, mission });

                //Domaine d'intervention
                if(domaine){
                    //verif que ce dommaine existe pas
                    let dodo = await Domaine.getByNom(db, domaine);
                    if(dodo == null){
                        dodo = await Domaine.create(db, {nom : domaine});
                    }
                    await dodo.linkMission(mission);
                }


                res.redirect("/asso/");
            } catch(err) {
                console.error(err);
                next(err);
            }
        }
    }));

    router.post('/supprMission/:id', utils.asso_guard(async function(req, res, next) {
        const asso = await Association.getLoggedInUser(db, req);
        const mission = await asso.getMission(req.params.id);

        await mission.delete();

        res.render('accueil-assos', { //quel template utilisé : ici accueil asso
            title: "accueil association",
            missions: await asso.getMissions()
        });
    }));


    router.post('/ajoutDomMission/:id', utils.asso_guard(async function(req, res, next) {
        const asso = await Association.getLoggedInUser(db, req);
        const mission = await asso.getMission(req.params.id);
        const creneaux = await mission.getCreneaux();

        // Récups nouv infos
        const { domaine } = req.body;

        let needSave = false;

        //Domaine d'intervention
        if(domaine){
            //verif que ce dommaine existe pas
            let dodo = await Domaine.getByNom(db, domaine);
            if(dodo == null){
                dodo = await Domaine.create(db, {nom : domaine});
            }
            await dodo.linkMission(mission);
        }

        res.render("edit-mission", {
            title: mission.titre,

            asso: asso,
            mission: mission,
            creneaux : creneaux,
            candidats: await mission.getPostulants(),
            domaines : await mission.getDomaines()
        });
    }));


    //accepter postulation
    router.get('/acceptPostulation/:idCitoyen/:idcreneau/:idmission', utils.asso_guard(async function(req, res, next) {
        const asso = await Association.getLoggedInUser(db, req);

        //changer le status de cette postulation a 1
        const user = await Citoyen.getByLogin(db, req.params.idCitoyen);
        const postu = await Postulation.getByCitoyenAndCreneau(db, user, req.params.idcreneau);
        if (postu == null) {
            return res.status(404);
        }

        postu.status = true;
        postu.save();

        res.redirect("/asso/mission/" + req.params.idmission);

    }));

    //refuser postulation
    router.get('/refusPostulation/:idCitoyen/:idcreneau/:idmission', utils.asso_guard(async function(req, res, next) {
        const asso = await Association.getLoggedInUser(db, req);

        //supp cette postulation
        const user = await Citoyen.getByLogin(db, req.params.idCitoyen);
        await Postulation.deletePostulation(db, user, req.params.idcreneau);


        res.redirect("/asso/mission/" + req.params.idmission);

    }));

    return router;
};
