var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var session = require('express-session');
var bcrypt = require('bcryptjs');
var routes = require('./routes/index');
var flash = require('connect-flash');
var http = require('http');
var socketio = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketio(server);

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
module.exports = app;


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge : 3600000 }
}));

var sharedsession = require("express-socket.io-session");


app.use(flash());

app.use(function (req, res, next) {
  res.locals.messages = req.flash('messages');
  next();
});

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://stockdatauserdb:whee1234@ds032319.mlab.com:32319/accountdatabase');

var Schema = mongoose.Schema;

var userDetailSchema = new Schema({
    firstname: String,
    username: String,
    email: String,
    password: String
});

var User = mongoose.model('User', userDetailSchema);

passport.use(new LocalStrategy(function(username, password, done) {
  process.nextTick(function() {
    User.findOne({
      'username': username, 
    }, function(err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false);
      }

      var result = bcrypt.compareSync(password, user.password);

      if (result) {

        return done(null, user);
      } else {
        
        return done(null, false);
      }

    });
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.post('/signin', passport.authenticate('local', {
        successRedirect: '/signedin',
        failureRedirect: '/'
}));

//This may be the reason you are expeirencing data override issues because you are creating
//a string for every http request connected.
var allConnectionsMatches = [];

var sessionID;

app.get('/', function(req, res, next) {

  sessionID = req.session.id;
  
  res.render('index.ejs')

});

function findDuplicates(data, sessionID, socket) {

    var isPositive = data.lastIndexOf(sessionID);

    console.log(isPositive + 'index of session id (http request in array)')

    if (isPositive === true) {
      //checks if http request is found

      var socketLocation = allConnectionsMatches.indexOf(sessionID);

      socketLocation + 1;

      allConnectionsMatches.splice(socketLocation, 1, socket)

      //find the http request find the old socket and replace it with the new one
    } else if(isPositive === -1) {
      console.log(socket + 'function socket')
      //fix the NAN bug so every time you refresh the page you will always get a id pair
      data.push(sessionID, socket);
    } else {
      
    }

}


io.on('connection', function (socket) {
  findDuplicates(allConnectionsMatches, sessionID, socket)
});

app.post('/signup', function(req, res) {

    console.log('REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE')

    var sessionPlaceInArray = allConnectionsMatches.indexOf(req.session.id);

    var socketPlaceInArray = sessionPlaceInArray + 1;

    var postSocket = allConnectionsMatches[socketPlaceInArray];

    var userDetails = User({
        firstname: req.body.firstname,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password1, bcrypt.genSaltSync(10))
    });

    User.findOne({
        $or: [{
            'username': req.body.username
        }, {
            'email': req.body.email
        }]
    }, function(err, user) {
        if (user) {
            if (user.username === req.body.username) {
              postSocket.emit('news', 'hello, how are you username');
              console.log('username is taken');
            } else {
            }
            if (user.email === req.body.email) {
              postSocket.emit('news', 'hello, how are you email');
              console.log('email is taken')
            } else {}
        } else {
            userDetails.save(function(err) {
                if (err) throw err;
            });
            res.redirect('/');
            console.log('change to login')
        }
        if (err) {
            console.log(err);
            return done(err);
        }
    });
    console.log('R222222222222222222222222222222222222222222222222222222222')
});

app.use('/', routes);

server.listen(3000, console.log('Ready to work'));