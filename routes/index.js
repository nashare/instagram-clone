const express = require('express');
const passport = require('passport');
const router = express.Router();
const indexController = require('../controllers/index');

router.get('/', indexController.home);
router.get('/auth/google', passport.authenticate(
    // Which passport strategy is being used?
    'google',
    {
        // Requesting the user's profile and email
        scope: ['profile', 'email'],
        // Optionally force pick account every time
        // prompt: "select_account"
    }
));
router.get('/oauth2callback', passport.authenticate(
    'google',
    {
        successRedirect: '/',
        failureRedirect: '/'
    }
));
router.get('/logout', function (req, res) {
    req.logout(function () {
        res.redirect('/');
    });
});

module.exports = router;