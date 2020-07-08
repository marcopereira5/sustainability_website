"use strict";
const express = require("express");
const options = require("./config/options.json");
const path = require("path");
const requestHandlers = require("./scripts/request-handlers.js");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("www"));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + '/www/intro.html'));
});

app.listen(options.server.port, function () {
    console.log("Server running at http://localhost:%d", options.server.port);
});