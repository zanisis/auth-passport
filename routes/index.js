var express = require('express');
var router = express.Router();
const passwordHash = require('password-hash');
const controller = require('../controller/controller');
const User = require('../models/user');


//passport
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

passport.use(new Strategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
            if (!user) {
            return done(null, { message: 'You must register!' });
            }
            if (!passwordHash.verify(password, user.password)) {
            return done(null, { message: 'Incorrect password.' });
            }
            return done(null, user);
          });
  }
));

var app = express()

app.use(passport.initialize());

/* GET home page. */
router.post('/register', controller.register);
router.post('/login',passport.authenticate('local', { session : false  }), controller.login);


module.exports = router;
