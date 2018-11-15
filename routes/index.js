const express = require('express');
const debug = require("../debug");
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express',
        connected: debug.connected
    });
});

module.exports = router;
