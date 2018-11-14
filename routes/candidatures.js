var express = require('express');
var router = express.Router();

/* GET page candidatures. */
router.get('/pageCandidatures', function(req, res, next) {
  res.render('pageCandidatures', {
      title: 'Express',
      connected: false
  });
});

module.exports = router;
