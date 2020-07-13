const LocalStrategy = require('passport-local').Strategy;
const requestHandlers = require("./scripts/request-handlers.js");

function initialize(passport){
    const authenticateUser = (username, password, done) => {
        var user;
        var users = JSON.parse(requestHandlers.getUsers());

        console.log(users + "Hello");

        users.forEach(element => {
            console.log(element);
            if (element.username === username){
                user = element;
            }
        });

        console.log(user);

        if (user == null){
            return done(null, false, { message: 'No user with that username'});
        }

        try {
            if (password == user.password){
                console.log("LOGGED");
                return done(null, user);
            } else {
                return done(null, false, {message: 'Password incorrect'})
            }
        } catch (e) {
            return done(e);
        }
    }

    passport.use(new LocalStrategy({usernameField: 'username'}, authenticateUser));

    passport.serializeUser((user, done) => { 
        console.log("Serialized:" + user);
        done(null, user.id); 
    });
    passport.deserializeUser((id, done) => { 
        var user_aux;
        var users_aux = JSON.parse(requestHandlers.getUsers());

        users_aux.forEach(element => {
            if (element.id == id){
                user_aux = element;
            }
        });
        console.log("Dese: " + user_aux.username);
        done(null, user_aux);
    });
}

module.exports = initialize;