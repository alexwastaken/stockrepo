var express = require('express');
var router = express.Router();

var people = ''

/* GET home page. */
router.get('/signinTrail', ensureAuthenticated, figureOutUser, function (req, res) {
    res.render('index', { serverPeople: people });
});

router.get('/signin', function (req, res) {
	res.render('signinpage');
});

router.get('/', function (req, res) {
  res.render('landingpage');
});

router.get('/homepage', function (req, res) {
  res.render('homepage');
});

router.get('/stockpage', function (req, res) {
  res.render('stockpage');
});

function ensureAuthenticated(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  } else {
    res.redirect('/signin');
    console.log('redirecting')
  }
}

function figureOutUser(req, res, next) {
	people = req.user.firstname
	next();
	
}

module.exports = router;