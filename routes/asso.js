const express = require('express');
const debug = require("../debug");

const router = express.Router();

// mon profil
router.get('/', function(req, res, next) {
  res.render('accueil-assos', {
      title: "Mon association",
      connected: debug.connected
  });
});


module.exports = router;
