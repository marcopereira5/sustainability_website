"use strict";
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;
const options = require("../config/options.json");

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

                }
				
				user.close();

            });

        }

    });
	
}
module.exports.getPeople = getPeople;


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