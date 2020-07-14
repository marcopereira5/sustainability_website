"use strict";

/**
 * @class Guarda toda a informação necessária para o suporte de requests
 */

const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;
const options = require("../config/options.json");
const user = require("../www/scripts/user.js");
const { json } = require("body-parser");

var users = [];
/**
 * retorna mongodb client
 */
function getMongoDbClient() {
    return new MongoClient(options.mongoDB.connectionString, {useUnifiedTopology: true});
}

/**
 * envia para o lado do cliente todos os users
 * 
 * @param req - request
 * @param res - result
 */
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

/**
 * returna os users
 * @param req - request
 * @param res - result
 */
function getUsers(req, res) {
	return JSON.stringify(users);
}
module.exports.getUsers = getUsers;

/**
 * retorna todas as threads guardadas na base de dados e envia para o lado do cliente
 * @param req - request
 * @param res - result
 */
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
                    _id: new ObjectID(req.method == 'PUT' ? req.user.id : null)
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

/**
 * Dá update numa thread, adiciona uma reply
 * @param {*} req 
 * @param {*} res 
 */
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

/**
 * returna um user que está logged in
 * @param {*} req 
 * @param {*} res 
 */
function getUser(req, res){
    let user = getMongoDbClient();

    user.connect(function (err) {

        if (err) {

            res.json({"message": "error", "error": err});

        } else {
            let collection = user.db('Project').collection('User');
            if (req.user){
                collection.find({name: req.user.username}, {name:1, email:1, password:1}).toArray(function(err, documents) {
                    if (err) {
                        res.json({"message": "error", "error": err });
                    } else {
                        res.json({"message": "success", "user": documents });
                    }	
                    user.close();
                    return documents;
                });
            }
        }
    })
}

module.exports.getUser = getUser;

/**
 * dá update num user
 * @param {*} req 
 * @param {*} res 
 */
function updateUser(req, res){
    let user = getMongoDbClient();

    console.log("Mano");

    user.connect(function (err) {

        if (err) {

            res.json({"message": "error", "error": err});

        } else {
            let collection = user.db('Project').collection('User');
            collection.update(
                {
                    _id: new ObjectID(req.body.id)
                },
                { 
                    name: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                },
                {
                    multi: false,
                    upsert: true
                },
                function(err, response) {

                    if(err) {
                        
                        console.log(err);
                        res.sendStatus(404);

                    } else {
                        console.log(response.result);
                        res.send(response.result);
                    }
            
                    user.close();
                }
            )
        }

    })
}

module.exports.updateUser = updateUser;