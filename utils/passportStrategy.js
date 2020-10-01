var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var UsersController = require('../controller/controller');

passport.serializeUser(function (user, done) {
    return done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    const usersController = new UsersController();
    usersController.findUserById(id)
        .then((user) => {
            if (user != undefined) { return done(null, user) } else { return done(err, null) }
        }).catch((err) => { return done(err, null) });
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        // console.log('pass');
        var credentials = { email: username, password: password };
        const usersController = new UsersController();
        usersController.authenticateUser(credentials)
            .then((user) => {
                if (user != undefined) {

                    return done(null, user);
                } else {
                    return done(null, false);
                }
            }).catch((err) => {
                return done(err);
            });
    }
));