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
const { resolve } = require("path");

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

var users = []

initializePassport(passport);

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + '/www/intro.html'));
});

app.get("/register", checkNotAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname + '/www/register.html'));
});

app.get("/users", requestHandlers.getPeople);

app.get("/forum", checkAuthenticated, function (req, res){
    res.sendFile(path.join(__dirname + '/www/forum.html'));
});

app.put("/threads", requestHandlers.updateThread);

app.get("/logged", checkAuthenticated, function (req, res){
    res.sendFile(path.join(__dirname + '/www/logged.html'));
});

app.post("/threads", requestHandlers.createThread);

app.get("/threads", requestHandlers.getThreads)

app.post("/register", requestHandlers.createUpdateUser);

app.post("/login",
    passport.authenticate('local'), 
    function(req, res) {
        res.json({LoginStatus: "Success", redirect: '/'});
    });
app.post("/", function(req, res) {
    transporter.sendMail(req.body);
});

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
