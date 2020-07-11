"use strict";
const express = require("express");
const options = require("./config/options.json");
const path = require("path");
const requestHandlers = require("./scripts/request-handlers.js");
const bodyParser = require("body-parser");
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const information_aux = require("./www/scripts/information");
const initializePassport = require('./passport_config');
const transporter = require('./mail_config');

initializePassport(passport, username => {
    information_aux.getUsers.find(user => user.username === username),
    id => {
        information_aux.getUsers.find(user => user.id === id)
    }
});

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("www"));
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

app.post("/login", passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

app.get("/login", function (req, res){
    res.sendFile(path.join(__dirname + "/www/login.html"));
});

app.listen(options.server.port, function () {
    console.log("Server running at http://localhost:%d", options.server.port);
});