const express = require('express');
const router = express.Router();

module.exports = function(db) {
    /* GET home page. */
    router.get('/', function (req, res, next) {
        db.get('SELECT * FROM test WHERE test = 87')
            .then(test => {
                res.render('index', {
                    title: 'Express',
                    test: test,
                    connected: parseInt(req.signedCookies.connected)
                });
            });
    });

    router.get('/test', function(req, res, next) {
        db.all('SELECT * FROM test')
            .then(function(tests) {
                res.send(tests);
            });

        db.run("INSERT INTO test VALUES (9)");
    });

    return router;
};