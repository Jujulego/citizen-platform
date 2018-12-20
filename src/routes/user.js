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

    router.get('/connexion', function (req, res, next) {
        res.cookie("connected", req.signedCookies.connected === "0" ? "1" : "0", {
            httpOnly: true, //cookies juste pour notre site
            signed: true //être sûr que c'est bien tes cookies à toi (=signature)
        });
        res.redirect("/");
    });

    return router;
};
