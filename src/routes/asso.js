// Constructeur
import { Router } from 'express';

import Mission from '../db/mission';
import utils from '../utils';
import Association from "../db/Association";

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

    router.get('/mission/:id', utils.asso_guard(async function(req, res, next) {
        const asso = await Association.getLoggedInUser(db, req);
        const mission = await asso.getMission(req.params.id);

        res.render("edit-mission", {
            title: mission.titre,

            asso: asso,
            mission: mission,
            candidats: await mission.getPostulants()
        });
    }));



    //modifications Informations citoyen
    router.post('/',utils.asso_guard(async function(req, res, next) {
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


    return router;
};
