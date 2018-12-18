const express = require('express');
const debug = require("../debug");

const router = express.Router();

// mon accueil
router.get('/', function(req, res, next) {
  res.render('accueil-assos', {
      title: "accueil association",
      connected: debug.connected
  });
});

//mon Profil
router.get('/', function(req, res, next) {
  res.render('profil-association', {
      title: "Mon association",
      connected: debug.connected
  });
});


module.exports = router;
