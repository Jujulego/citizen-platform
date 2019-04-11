// Constructeur
import { Router } from 'express';

import Mission from '../db/mission';
import CreneauMission from '../db/CreneauMission';
import utils from '../utils';
import Association from "../db/Association";
import Domaine from "../db/Domaine";
import Citoyen from "../db/Citoyen";
import Postulation from '../db/Postulation';

const SendMail = require("sendmail")();

// Router
export default function(db) {
    const router = Router();

    // Mon accueil
    router.get('/', utils.asso_guard(async function(req, res, next) { // définit la route pour accéder à la page accueil de l'association
        try {
            const asso = await Association.getLoggedInUser(db, req);

            res.render('accueil-assos', { //quel template utilisé : ici accueil asso
                title: "accueil association",
                missions: await asso.getMissions()
            });
        } catch(err) {
            console.error(err);
            next(err);
        }
    }));

    // Mon profil
    router.get('/profil', utils.asso_guard(async function(req, res, next) { //définit la route pour accéder à la page profil de l'association
        try {
            const asso = await Association.getLoggedInUser(db, req);

            res.render('profil-association', { //quel template utilisé : ici profil asso
                title: "Mon association",
                asso: asso,
            });
        } catch(err) {
            console.error(err);
            next(err);
        }
    }));

    //modifications Informations citoyen
    router.post('/', utils.asso_guard(async function(req, res, next) {
        try {
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
        } catch(err) {
            console.error(err);
            next(err);
        }
    }));

    router.post('/modifPresentation', utils.asso_guard(async function(req, res, next) {
        try {
            const { presentation } = req.body;

            // Modif user
            const asso = await Association.getLoggedInUser(db, req);

            let needSave = false;


            if (presentation !== asso.presentation) {
                asso.presentation = presentation;
                needSave = true;
            }

            if (needSave) {
                asso.save()
                    .then(function () {
                        res.redirect("/asso/Profil");
                    });
            }
        } catch(err) {
            console.error(err);
            next(err);
        }
    }));


    router.post('/mission/:id', utils.asso_guard(async function(req, res, next) {
        try {
            // Récups nouv infos
            const { titre, lieu, description, nbPers } = req.body;

            const asso = await Association.getLoggedInUser(db, req);
            const mission = await asso.getMission(req.params.id);

            let needSave = false;

            if (titre !== mission.titre) {
                mission.titre = titre;
                needSave = true;
            }

            if (lieu !== mission.lieu) {
                mission.lieu = lieu;
                needSave = true;
            }

            if (description !== mission.description) {
                mission.description = description;
                needSave = true;
            }

            if (+nbPers !== mission.nbPersAtteindre) {
                mission.nbPersAtteindre = nbPers;
                needSave = true;
            }

            if (needSave) {
                await mission.save();
                res.redirect('/asso/mission/' + req.params.id);
            }
        } catch(err) {
            console.error(err);
            next(err);
        }
    }));

    router.get('/mission/:id', utils.asso_guard(async function(req, res, next) {
        try {
            const asso     = await Association.getLoggedInUser(db, req);
            const mission  = await asso.getMission(req.params.id);
            const creneaux = await mission.getCreneaux();
            const postulations = await mission.getPostulants();

            const now = new Date();
            const mp1 = new Date(new Date().setMonth(now.getMonth() + 1));

            const dates = new Map();
            const first = { debut: mp1, duree: 0 };

            // Toutes les répétitions dans le prochain mois
            creneaux.forEach(c => {
                c.generateRepetitions(now, mp1, (r, debut, fin) => {
                    if (debut < first.debut) {
                        first.debut = debut;
                        first.duree = c.tempsMission;
                    }

                    dates.set(`${c.id}-${r}`, {
                        id: `${c.id}-${r}`,
                        creneau: c,
                        repetition: { r, debut, fin },
                        postulants: []
                    });
                });
            });

            // Toutes les postulations
            postulations.forEach(p => {
                const id = `${p.creneau.id}-${p.postulation.r}`;

                if (dates.has(id)) {
                    dates.get(id).postulants.push({
                        postulant: p.postulant,
                        postulation: p.postulation
                    });
                }
            });

            res.render("edit-mission", {
                title: mission.titre,
                asso, mission,

                first, dates,
                domaines: await mission.getDomaines()
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }));

    //Création de missions
    router.get('/createMission', utils.asso_guard(async function(req, res, next) {
        try {
            const asso = await Association.getLoggedInUser(db, req);

            res.render('createMission', {
                title: "Creation Mission",
                asso: asso,
            });
        } catch(err) {
            console.error(err);
            next(err);
        }
    }));

    router.post('/createMission', utils.asso_guard(async function(req, res, next) {
        try {
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
            }
        } catch(err) {
            console.error(err);
            next(err);
        }
    }));

    router.post('/supprMission/:id', utils.asso_guard(async function(req, res, next) {
        try {
            const asso = await Association.getLoggedInUser(db, req);
            const mission = await asso.getMission(req.params.id);

            await mission.delete();

            res.render('accueil-assos', { //quel template utilisé : ici accueil asso
                title: "accueil association",
                missions: await asso.getMissions()
            });
        } catch (err) {
            console.error(err);
            next(err);
        }
    }));

    router.post('/ajoutDomMission/:id', utils.asso_guard(async function(req, res, next) {
        try {
            const asso = await Association.getLoggedInUser(db, req);
            const mission = await asso.getMission(req.params.id);
            const creneaux = await mission.getCreneaux();

            // Récups nouv infos
            const { domaine } = req.body;

            let needSave = false;

            //Domaine d'intervention
            if (domaine) {
                //verif que ce dommaine existe pas
                let dodo = await Domaine.getByNom(db, domaine);
                if (dodo == null) {
                    dodo = await Domaine.create(db, { nom: domaine });
                }
                await dodo.linkMission(mission);
            }

            res.redirect('/asso/mission/' + req.params.id);
        } catch(err) {
            console.log(err);
            next(err);
        }
    }));


    //accepter postulation
    router.get('/acceptPostulation/:idCitoyen/:idrep/:idmission', utils.asso_guard(async function(req, res, next) {
        try {
            const asso = await Association.getLoggedInUser(db, req);

            const { idrep } = req.params;
            const [ idcreneau, r ] = idrep.split('-');

            const user = await Citoyen.getByLogin(db, req.params.idCitoyen);
            const postu = await Postulation.getByCitoyenAndCreneauR(db, user, idcreneau, r);
            const mission = await Mission.getById(db, req.params.idmission);

            if (postu == null) {
                return res.status(404);
            }

            //changer le status de cette postulation a 1
            postu.status = true;
            await postu.save();

            const rep = await postu.getRepetition();
            // rep.debut

            SendMail({
                from: 'no-reply@csp.net',
                to: user.login,
                subject: 'CITIZEN-SERVICES-PLATFORM : Votre candidature a été retenue !',
                html: `Bonjour ! Félicitation, votre candidature pour "${mission.titre}" à "${mission.lieu}" (démarrant le : " ${rep.debut}" et terminant le : "${rep.fin} ") a été retenue ! A bientôt sur notre plateforme ! Bien Cordialement, CITIZEN SERVICES PLATFORM`,
            }, (err, reply) => console.log(err && err.stack));

                res.redirect("/asso/mission/" + req.params.idmission);
            } catch(err) {
                console.log(err);
                next(err);
        }
    }));

    //refuser postulation
    router.get('/refusPostulation/:idCitoyen/:idrep/:idmission', utils.asso_guard(async function(req, res, next) {
        try {
            const asso = await Association.getLoggedInUser(db, req);
            const mission = await Mission.getById(db, req.params.idmission);

            //supp cette postulation
            
            const { idrep } = req.params;
            const [idcreneau, r] = idrep.split('-');

            const user = await Citoyen.getByLogin(db, req.params.idCitoyen);
            const postu = await Postulation.getByCitoyenAndCreneauR(db, user, idcreneau, r);
            
            
            await Postulation.deletePostulation(db, user, idcreneau, r);
            const rep = await postu.getRepetition();
            
            
            SendMail({
                from: 'no-reply@csp.net',
                to: user.login,
                subject: 'CITIZEN-SERVICES-PLATFORM : Réponse à votre candidature ',
                html: `Bonjour, nous vous remercions pour votre candidature pour "${mission.titre}" à "${mission.lieu}" (démarrant le : " ${rep.debut}" et terminant le : "${rep.fin} "). Malheureusement cette dernière n'a pas été retenue par notre association. En vous remerciant pour l'intérêt que vous nous portez : n'hésitez pas à postuler pour d'autres missions ! Bien Cordialement, CITIZEN SERVICES PLATFORM`,
            }, (err, reply) => console.log(err && err.stack));


            res.redirect("/asso/mission/" + req.params.idmission);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }));

    return router;
};
