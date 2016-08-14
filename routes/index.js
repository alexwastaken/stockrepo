var express = require('express');
var router = express.Router();

var userInfo = '';


router.get('/signedin', ensureAuthenticated, figureOutUser, function(req, res, next) {
  res.render('loggedin.ejs', { serverName: userInfo });
});

router.get('/loggedout', function(req, res){
  req.logout();

  res.redirect('/')
});

function ensureAuthenticated(req, res, next) {
  console.log(req.isAuthenticated())
  if(req.isAuthenticated()){
    return next();
  } else {
    res.redirect('/');
  }
}

function figureOutUser(req, res, next) {
	userInfo = req.user.username
	next();
}

module.exports = router;