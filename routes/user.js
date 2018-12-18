const express = require('express');
const debug = require("../debug");

const router = express.Router();

// mon profil
router.get('/', function(req, res, next) {
  res.render('profil-benevole', {
      title: "Mon Profil",
      connected: parseInt(req.signedCookies.connected)
  });
});

// mes candidatures
router.get('/candidatures', function(req, res, next) {
    res.render("candidatures", {
        title: "Mes Candidatures",
        connected: parseInt(req.signedCookies.connected)
    });
});

router.get('/connexion', function(req, res, next) {
    res.cookie("connected", req.signedCookies.connected === "0" ? "1" : "0", {
        httpOnly: true,
        signed: true
    });
    res.redirect("/");
});

module.exports = router;
