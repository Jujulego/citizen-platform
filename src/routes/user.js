// Importations
import { Router } from "express";
import Busboy from "busboy";
import fs from "fs-extra";
import path from "path";

import Postulation from '../db/Postulation';
import Association from "../db/Association";
import Citoyen from "../db/Citoyen";
import CreneauMission from '../db/CreneauMission';
import Document from "../db/Document";
import utils from "../utils";
import CreneauCitoyen from "../db/CreneauCitoyen";
import Competance from "../db/Competance";

// Constante
const MEDIA_PATH = path.join(__dirname, "../../media");

// Router
export default function(db) {
    const router = Router();

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
    router.get('/deconnexion', utils.login_guard(function(req, res) {
        // Déconnexion
        Association.disconnect(req);
        Citoyen.disconnect(req);

        res.redirect("/");
    }));

    // mon profil
    router.route('/')
        .get(utils.user_guard(async function(req, res, next) { //route
            try {
                const user = await Citoyen.getLoggedInUser(db, req);

                res.render('profil-benevole', { //lien entre la route et le pug profil
                    title: "Mon Profil",

                    user: user,
                    documents: await user.getDocuments(),
                    competances: await user.getCompetances(),
                });

            } catch(err) {
                console.log(err);
                next(err);
            }
        }))
        // Modification Informations citoyen
        .post(utils.user_guard(async function(req, res, next) {
            try {
                // Récups nouv infos
                const { nom, prenom, adresse, tel, situation, permis } = req.body;

                // Modif user
                const user = await Citoyen.getLoggedInUser(db, req);

                let needSave = false;

                if (nom !== user.nom) {
                    user.nom = nom;
                    needSave = true;
                }

                if (prenom !== user.prenom){
                    user.prenom = prenom;
                    needSave = true;
                }

                if (adresse !== user.adresse){
                    user.adresse = adresse;
                    needSave = true;
                }

                if (tel !== user.tel){
                    user.tel = tel;
                    needSave = true;
                }

                if (situation !== user.situation){
                    user.situation = situation;
                    needSave = true;
                }

                if (permis !== user.permis){
                    user.permis = permis;
                    needSave = true;
                }

                if (needSave) {
                    await user.save();
                    res.redirect("/user");
                }

            } catch(err) {
                console.log(err);
                next(err);
            }
        }));

    router.post('/ajoutComp', utils.user_guard(async function(req, res, next) {
        const user = await Citoyen.getLoggedInUser(db, req);

        const { nom, description } = req.body;

        //add competance
        await Competance.create(db, { nom, description, citoyen: user});

        res.redirect("/user");


    }));



    // Supprimer le profil citoyen
    router.post('/supprCitoyen',utils.user_guard(async function(req, res, next) {
        try {
            const user = await Citoyen.getLoggedInUser(db, req);
            await user.delete();

            Citoyen.disconnect(req);
            res.redirect("/");

        } catch(err) {
            console.log(err);
            next(err);
        }
    }));

    // Missions
    router.post('/postuler', utils.user_guard(async function(req, res, next){
        try {
            const user = await Citoyen.getLoggedInUser(db, req);
            const { repetition } = req.body;

            if (typeof repetition === 'string') {
                const [ creneau, r ] = repetition.split('-');

                await Postulation.create(db, {
                    citoyen: user,
                    creneau: await CreneauMission.getById(db, creneau),
                    status: false, r
                });
            } else {
                for (let i = 0; i < repetition.length; ++i) {
                    const rep = repetition[i];
                    const [ creneau, r ] = rep.split('-');

                    await Postulation.create(db, {
                        citoyen: user,
                        creneau: await CreneauMission.getById(db, creneau),
                        status: false, r
                    });
                }
            }

            res.redirect("/");
        } catch(err) {
            console.log(err);
            next(err);
        }
    }));

    // Supprimer une postulation
    router.post('/suppPostu/:idrep', utils.user_guard(async function(req, res, next) {
        try {
            const { idrep } = req.params;
            const [ idcreneau, r ] = idrep.split('-');

            const user = await Citoyen.getLoggedInUser(db, req);
            await Postulation.deletePostulation(db, user, idcreneau, r);

            res.redirect("/user/candidatures");
        } catch(err) {
            console.log(err);
            next(err);
        }
    }));

    router.get('/candidatures', utils.user_guard(async function(req, res, next) { //route
        try {
            const user = await Citoyen.getLoggedInUser(db, req);
            const postulations = await user.getPostulations();
            const missions = [];

            for (let p of postulations) {
                const rep = await p.getRepetition();
                const miss = await rep.creneau.mission.get();

                missions.push({
                    creneau: rep.creneau,
                    mission: miss,
                    status : p.status,
                    repetition: rep,
                    asso : await Association.getByLogin(db, miss.association.pk)
                });
            }

            res.render("candidatures", { // lien entre la route et le pug candidature
                title: "Mes Candidatures",
                missions: missions
            });

        } catch(err) {
            console.log(err);
            next(err);
        }
    }));

    // Documents
    router.post('/document/add', utils.user_guard(async function(req, res, next) {
        async function createDoc(res, titre, name, user) {
            try {
                const doc = await Document.create(db, { titre: titre, fichier: name, citoyen: user });

                res.json({
                    id: doc.id,
                    titre: doc.titre,
                    fichier: doc.fichier,
                    filename: doc.filename,
                });
            }  catch(err) {
                console.error(err);
                next(err);
            }
        }

        try {
            // Get user
            const user = await Citoyen.getLoggedInUser(db, req);

            // Récupération du fichier
            const busboy = new Busboy({ headers: req.headers });
            let fname = null, titre = null;

            busboy.on('field', function(field, val) {
                if (field !== "titre") return;

                titre = val;

                if (titre && fname) {
                    createDoc(res, titre, fname, user);
                }
            });

            busboy.on('file', function(field, file, filename) {
                // Check field
                if (field !== "file") return;

                // Generate random name
                const name = utils.random_text(40) + path.extname(filename);
                console.log(`Uploading : ${filename} to ${name}`);

                // Path to file
                const fstream = fs.createWriteStream(path.join(MEDIA_PATH, name));
                file.pipe(fstream);

                fstream.on('close', function() {
                    console.log(`${filename} uploaded to ${name}`);
                    fname = name;

                    if (titre && fname) {
                        createDoc(res, titre, fname, user);
                    }
                });
            });

            req.pipe(busboy);

        } catch(err) {
            console.error(err);
            next(err);
        }
    }));
    router.route('/document/:id')
        .post(utils.user_guard(async function(req, res, next) {
            // Params
            const { id } = req.params;
            const { titre } = req.body;

            if (!titre) {
                return res.status(400).json({ msg: "Missing titre parameter" })
            }

            try {
                // Get user
                const doc = await Document.getById(db, id);
                const user = await Citoyen.getLoggedInUser(db, req);

                // Bon user ?
                if (doc.citoyen.pk !== user.login) {
                    return res.status(403).json({ msg: "Vous n'avez pas accès à ce fichier" });
                }

                // Renomage
                doc.titre = titre;
                await doc.save();

                res.json({
                    id: doc.id,
                    titre: doc.titre,
                    fichier: doc.fichier,
                    filename: doc.filename,
                });

            } catch(err) {
                console.log(err);
                next(err);
            }
        }))
        .delete(utils.user_guard(async function(req, res, next) {
            // Params
            const { id } = req.params;

            try {
                // Get user
                const doc = await Document.getById(db, id);
                const user = await Citoyen.getLoggedInUser(db, req);

                // Bon user ?
                if (doc.citoyen.pk !== user.login) {
                    return res.status(403).json({ msg: "Vous n'avez pas accès à ce fichier" });
                }

                // Suppression !
                await doc.delete();
                res.json({ msg: "Supprimé !" });

            } catch(err) {
                console.log(err);
                next(err);
            }
        }));

    // Créneaux
    router.get('/creneaux', utils.user_guard(async function(req, res, next) {
        try {
            // Params
            const start = new Date(req.query.start);
            const end   = new Date(req.query.end);

            // Get créneaux
            const user = await Citoyen.getLoggedInUser(db, req);
            const creneaux = await user.getCreneauxBetween(start, end);
            const data = [];

            for (let i = 0; i < creneaux.length; ++i) {
                const cre = creneaux[i];

                // 1er
                cre.generateRepetitions(start, end, (r, deb, fin) => {
                    data.push({
                        id: `${cre.id}-${r}`,
                        title: cre.debut_txt,
                        allDay: false,
                        start: deb,
                        end: fin,
                        editable: false
                    });
                });
            }

            res.json(data);
        } catch(err) {
            console.log(err);
            next(err);
        }
    }));

    router.get('/creneaux/missions', utils.user_guard(async function(req, res, next) {
        try {
            // Params
            const start = new Date(req.query.start);
            const end   = new Date(req.query.end);

            // Get postulations
            const user = await Citoyen.getLoggedInUser(db, req);
            const postulations = await user.getPostulations();
            const data = [];

            for (let i = 0; i < postulations.length; ++i) {
                const p = postulations[i];
                const rep = await p.getRepetition();
                const mission = await rep.creneau.mission.get();

                if (end > rep.debut && start < rep.fin) {
                    data.push({
                        id: `${rep.creneau.id}-${rep.r}`,
                        title: mission.titre,
                        allDay: false,
                        start: rep.debut,
                        end: rep.fin,
                        editable: false,
                        url: `/mission/${mission.id}/`,
                        borderColor: p.status ? 'red' : 'orange',
                        backgroundColor: p.status ? 'red' : 'orange',
                    });
                }
            }

            res.json(data);
        } catch(err) {
            console.log(err);
            next(err);
        }
    }));

    router.put("/creneaux/add", utils.user_guard(async function(req, res, next) {
        try {
            const user = await Citoyen.getLoggedInUser(db, req);

            // Params
            const deb = new Date(req.body.debut);
            const fin = new Date(req.body.fin);

            // Nouveau créneau !
            await CreneauCitoyen.create(db, { ...req.body, debut: deb, fin: fin, citoyen: user });
            res.json({});
        } catch(err) {
            console.log(err);
            next(err);
        }
    }));

    router.post("/creneaux/:idrep/remove", utils.user_guard(async function(req, res, next) {
        try {
            const user = await Citoyen.getLoggedInUser(db, req);

            const { idrep } = req.params;
            const idcreneau = idrep.split('-')[0];

            // suppression !
            const cre = await CreneauCitoyen.getByIdAndCitoyen(db, idcreneau, user);
            cre.delete();

            res.redirect('/user');
        } catch(err) {
            console.log(err);
            next(err);
        }
    }));

    return router;
};
