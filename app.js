"use strict";
const express = require("express");
const options = require("./config/options.json");
const path = require("path");
const requestHandlers = require("./scripts/request-handlers.js");
const bodyParser = require("body-parser");
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const initializePassport = require('./passport_config');
const { get } = require("http");
const transporter = require('./mail_config');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Project");
    dbo.collection("User").find().toArray(function(err, result) {
        if (err) throw err;

        initializePassport(passport, 
            result,
            result
        );

        db.close();
    });
    
});

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("www"));
app.use(flash());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + '/www/intro.html'));
});

app.get("/register", function(req, res) {
    res.sendFile(path.join(__dirname + '/www/register.html'));
});

app.get("/users", requestHandlers.getPeople);

app.post("/register", requestHandlers.createUpdateUser);

app.post("/login", 
    passport.authenticate('local'), 
    function(req, res) {
        console.log("hello");
        res.json({status: "Success", redirect: '/'});
    });
app.post("/", function(req, res) {
    transporter.sendMail(req.body);
});

app.post("/login", checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

app.get("/login", checkNotAuthenticated, function (req, res){
    res.sendFile(path.join(__dirname + "/www/login.html"));
});

app.listen(options.server.port, function () {
    console.log("Server running at http://localhost:%d", options.server.port);
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }

    next();
}
