var express = require('express');
var router = express.Router();
var { User } = require('../models/userSchema');
var Auth = require('../middleware/authMiddleware');

var passport = require('passport');
var LocalStrategy = require('passport-local');

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new LocalStrategy((username, password, callback) => {
    User.findOne({ username: username })
        .then(user => {
            if (!user || user.password !== password) { // TODO: hash using something like bcrypt
                callback(null, false, { message: "Incorrect username or password" });
            } else {
                callback(null, { id: user._id, username: username, isAdmin: user.isAdmin });
            }
        })
        .catch(err => callback(err));
}));

router.post('/login/password', passport.authenticate('local', {}), (req, res, next) => {
    const user = req.session.passport.user;
    res.json({ id: user.id, username: user.username, isAdmin: user.isAdmin });
});

// Endpoint used when the page is refreshed, to check if the user is still logged in
router.get('/login/refresh', Auth.requireAuthentication(), (req, res, next) => {
    const user = req.session.passport.user;
    res.json({ id: user.id, username: user.username, isAdmin: user.isAdmin });
});

router.post('/logout', (req, res, next) => {
    if (req.isAuthenticated()) {
        req.logout(() => req.session.destroy());
    }

    res.status(204).end();
});

module.exports = router;
