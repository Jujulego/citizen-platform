const express = require('express');
const router = express.Router();

module.exports = function(db) {
    // mon profil
    router.get('/', function (req, res, next) { //route
        res.render('profil-benevole', { //lien entre la route et le pug profil
            title: "Mon Profil",
            connected: parseInt(req.signedCookies.connected)
        });
    });

    // mes candidatures
    router.get('/candidatures', function (req, res, next) { //route
        res.render("candidatures", { //lien entre la route et le pug candidature
            title: "Mes Candidatures",
            connected: parseInt(req.signedCookies.connected)
        });
    });

    router.post('/connexion', function (req, res, next) {
        // Récupération des paramètres
        const email = req.body.email;
        const mdp = req.body.mdp;
        let rq = "";
        let champ = "";

        switch (req.body.type) {
            case "b": // => Bénévole
                rq = "select loginCitoyen from citoyen where loginCitoyen = ? AND mdpCitoyen = ?";
                champ = "loginCitoyen";
                break;

            case "a": // => Associations
                rq = "select loginAsso from association where loginAsso = ? AND mdpAsso = ?";
                champ = "loginAsso";
                break;
        }

        // Requête
        db.get(rq, [email, mdp])
            .then(function(user) {
                if (user[champ] === email) {
                    res.cookie("connected", "1", {
                        httpOnly: true, //cookies juste pour notre site
                        signed: true //être sûr que c'est bien tes cookies à toi (=signature)
                    });
                    res.redirect("/");
                }

                res.redirect("/");
            })
            .catch(function (reason) {
                console.error(reason);
                res.redirect("/?connerr=1&email=" + encodeURI(email));
            });
    });

    router.get('/deconnexion', function (req, res, next) {
        res.cookie("connected", "0", {
            httpOnly: true, //cookies juste pour notre site
            signed: true //être sûr que c'est bien tes cookies à toi (=signature)
        });
        res.redirect("/");
    });

    return router;
};
