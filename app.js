﻿var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nodemailer = require("nodemailer");
var mongoose = require("mongoose");

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

//Later figure out how to route /send below without putting it before / and /users


/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/


mongoose.connect('mongodb://stockdatauserdb:whee1234@ds032319.mlab.com:32319/accountdatabase');

var Schema = mongoose.Schema;

var personSchema = new Schema({
    User: String
});

var Person = mongoose.model('Person', personSchema);

var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: "stockdatacontact@gmail.com",
        pass: "whee1234"
    }
});
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/
var check;

app.get('/send', function(req, res) {
    //later what you need to do is not send another email if the email is already in the database
    var mailOptions = {
        to: req.query.to,
        subject: 'stockdata',
        text: 'Thanks for your interest. When the website is live we will send you a notification email. If you have any further question you can reply to this email.'
    }
    Person.findOne({
        "User": req.query.to
    }, function(err, doc) {
        if (doc) {
        	check = "It look like you're already in our database!";
        } else {
        	check = "We just sent you an email! Please check your inbox.";

            var Email = Person({

                User: req.query.to

            });
            Email.save(function(err) {
                if (err) throw err;
            });
            smtpTransport.sendMail(mailOptions, function(error, response) {
                if (error) {
                    console.log(error);
                    res.end("error");
                } else {
                    res.end("sent");
                }
            });
        }
    });
});

app.get('/checkemaildata', function(req, res) {
	var checkloop = setInterval(function(){
		if(check != "nothing" && check){
			res.send(check);
			check = "nothing";
			clearInterval(checkloop);
		}
	}, 500);
});

/*--------------------Routing Over----------------------------*/

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(process.env.PORT || 5000);

module.exports = app;
