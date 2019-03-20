// Importations
import { Router } from "express";
import Busboy from "busboy";
import fs from "fs-extra";
import path from "path";

import Association from "../db/Association";
import Citoyen from "../db/Citoyen";
import Document from "../db/Document";
import utils from "../utils";

// Constante
const MEDIA_PATH = path.join(__dirname, "../../media");

// Router
export default function(db) {
    const router = Router();

    // mon profil
    router.route('/')
        .get(utils.user_guard(async function(req, res, next) { //route
            const user = await Citoyen.getLoggedInUser(db, req);

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

    // Ajout documents
    function createDoc(res, titre, name, user) {
        Document.create(db, { titre: titre, lien: name, citoyen: user })
            .then(function(doc) {
                res.json({
                    id: doc.id,
                    titre: doc.titre,
                    lien: doc.lien,
                    filename: doc.filename,
                });
            })
            .catch(function(err) {
                console.error(err);
                next(err);
            });
    }

    router.post('/document/add', utils.user_guard(async function(req, res, next) {
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

            busboy.on('file', function(field, file, filename, encoding, mime) {
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

    //supprimer le profil citoyen
    router.post('/supprCitoyen',utils.user_guard(async function(req, res, next) {
        const user = await Citoyen.getLoggedInUser(db, req);
        await user.delete();

        Citoyen.disconnect(req);

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
