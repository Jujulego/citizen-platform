const express = require('express');
const debug = require("../debug");
const router = express.Router();

module.exports = function(db) {
    /* GET home page. */
    router.get('/', function (req, res, next) {
        res.render('index', {
            title: 'Express',
            connected: parseInt(req.signedCookies.connected)
        });
    });

    return router;
};