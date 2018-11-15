const express = require('express');
const debug = require("../debug");

const router = express.Router();

// mon profil
router.get('/', function(req, res, next) {
  res.render('profil-benevole', {
      title: "Mon Profil",
      connected: debug.connected
  });
});

// mes candidatures
router.get('/candidatures', function(req, res, next) {
    res.render("candidatures", {
        title: "Mes Candidatures",
        connected: debug.connected
    });
});

module.exports = router;
