"use strict";
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;
const options = require("../config/options.json");
const user = require("../www/scripts/user.js");
const { json } = require("body-parser");

var users = []

function getMongoDbClient() {
    return new MongoClient(options.mongoDB.connectionString, {useUnifiedTopology: true});
}

function getPeople(req, res) {
    
	let user = new MongoClient(options.mongoDB.connectionString, {useUnifiedTopology: true});

    user.connect(function (err) {

        if (err) {

            res.json({"message": "error", "error": err });

        } else {
            
            let collection = user.db('Project').collection("User");

            collection.find({}, {_id:1, name:1, email:1, password:1}).toArray(function(err, documents) {

                if (err) {

                    res.json({"message": "error", "error": err });
        
                } else {

                    res.json({"message": "success", "user": documents });

                    documents.forEach(element => {
                        users.push(new Object({id: element._id, username: element.name, email: element.email, password: element.password}));
                    });
                }
				
                user.close();
            });

        }

    });
	
}
module.exports.getPeople = getPeople;

function getUsers(req, res) {
	return JSON.stringify(users);
}
module.exports.getUsers = getUsers;

function getThreads(req, res) {
    
	let user = new MongoClient(options.mongoDB.connectionString, {useUnifiedTopology: true});

    user.connect(function (err) {

        if (err) {

            res.json({"message": "error", "error": err });

        } else {
            
            let collection = user.db('Project').collection("Thread");

            collection.find({}, {_id:1, name:1, text:1, date:1, user:1}).toArray(function(err, documents) {

                if (err) {

                    res.json({"message": "error", "error": err });
        
                } else {

                    res.json({"message": "success", "thread": documents });
                }
				
                user.close();
            });

        }

    });
	
}
module.exports.getThreads = getThreads;

function getCountries(req, res) {  
	let user = new MongoClient(options.mongoDB.connectionString, {useUnifiedTopology: true});
    user.connect(function (err) {
        if (err) {
            res.json({"message": "error", "error": err });
        } else {
            
            let collection = user.db('Project').collection("Country");

            collection.find({}, {name:1, img_src:1, description:1}).toArray(function(err, documents) {
                if (err) {
                    res.json({"message": "error", "error": err });
                } else {
                    res.json({"message": "success", "country": documents });
                }	
                user.close();
                return documents;
            });
        }
    });	
}

/**
 * Função para adicionar ou atualizar uma pessoa à BD
 * @param {*} req 
 * @param {*} res 
 */
function createUpdateUser(req, res){
    let user = getMongoDbClient();

    user.connect(function (err) {

        if (err) {

            res.json({"message": "error", "error": err});
            console.log(err);

        } else {
            let collection = user.db('Project').collection('User');
            collection.update(
                {
                    _id: new ObjectID(req.method == 'PUT' ? req.body.id : null)
                },
                {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                },
                {
                    multi: false,
                    upsert: true
                },
                function(err, response) {

                    if(err) {

                        res.sendStatus(404);

                    } else {

                        res.send(response.result);
                    }
            
                    user.close();
                }
            )
        }

    })
}

module.exports.createUpdateUser = createUpdateUser;

/**
 * Função para adicionar ou atualizar uma pessoa à BD
 * @param {*} req 
 * @param {*} res 
 */
function createThread(req, res){
    let user = getMongoDbClient();

    user.connect(function (err) {

        if (err) {

            res.json({"message": "error", "error": err});

        } else {
            let collection = user.db('Project').collection('Thread');
            collection.update(
                {
                    _id: new ObjectID(req.method == 'PUT' ? req.body.id : null)
                },
                {
                    name: req.body.name,
                    text: req.body.text,
                    date: new Date().toISOString().slice(0,10),
                    user: req.user,
                    replies: []
                },
                {
                    multi: false,
                    upsert: true
                },
                function(err, response) {

                    if(err) {

                        res.sendStatus(404);

                    } else {

                        res.send(response.result);
                    }
            
                    user.close();
                }
            )
        }

    })
}

module.exports.createThread = createThread;

function updateThread(req, res){
    let user = getMongoDbClient();

    user.connect(function (err) {

        if (err) {

            res.json({"message": "error", "error": err});

        } else {
            let collection = user.db('Project').collection('Thread');
            collection.update(
                {
                    _id: new ObjectID(req.body.id)
                },
                { 
                    $addToSet: {
                        replies: {creationDate: new Date().toISOString().slice(0,10), text: req.body.text, user: req.user}
                    }
                },
                {
                    multi: false,
                    upsert: true
                },
                function(err, response) {

                    if(err) {
                        res.sendStatus(404);

                    } else {
                        res.send({n: 1, nModified: 1, ok: 1, user: req.user, date: new Date().toISOString().slice(0,10)});
                    }
            
                    user.close();
                }
            )
        }

    })
}

module.exports.updateThread = updateThread;