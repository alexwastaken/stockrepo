var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', ensureAuthenticated, function (req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/signin', function (req, res) {
	res.render('signinpage');
});

router.get('/loginFailure', ensureAuthenticated, function(req, res, next) {
  res.send('Failed to authenticate');
});

router.get('/loginSuccess', ensureAuthenticated, function(req, res, next) {
  res.send('Successfully authenticated');
});

function ensureAuthenticated(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  } else {
    res.redirect('/signin');
    console.log('redirecting')
  }
}

module.exports = router;