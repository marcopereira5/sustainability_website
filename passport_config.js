const LocalStrategy = require('passport-local').Strategy;

function initialize(passport, users, users_aux){
    const authenticateUser = (username, password, done) => {
        var user;

        console.log(users);

        users.forEach(element => {
            if (element.name === username){
                user = element;
            }
        });

        console.log(user);

        if (user == null){
            return done(null, false, { message: 'No user with that username'});
        }

        try {
            if (password == user.password){
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
        console.log("HEYOOOO")
        done(null, user._id) 
    });
    passport.deserializeUser((id, done) => { 
        var user_aux;
        users_aux.forEach(element => {
            if (element._id == id){
                user_aux = element;
            }
        })
        return done(null, user_aux);
    });
}

module.exports = initialize;