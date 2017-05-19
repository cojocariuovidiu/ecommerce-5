var router = require('express').Router();
var User = require('../models/user');

router.get('/signup')

router.post('/signup', function(req, res, next){
    var user = new user();

    user.profile.name = req.body.name;    
    user.password = req.body.password;
    user.mail = req.body.email;

    User.findOne({ email: req.body.email }, function(err, existingUser){

        if(existingUser){
            console.log(req.body.email + "is already exit");
            return res.redirect('/signup');
        } else {
            user.save(function(err, user){
                if (err) return next(err);

                res.json("New user has been created");
            });
        }
    });
});

module.exports = router;