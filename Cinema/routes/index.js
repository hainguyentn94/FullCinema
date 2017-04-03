var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/admin', function(req, res, next) {
  res.render('admin_index');
});
router.get('/login', function(req, res, next) {
  res.render('admin_login');
});
router.get('/film', function(req, res, next) {
  res.render('admin_film');
});
module.exports = router;
