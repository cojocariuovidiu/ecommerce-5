var router = require('express').Router();
var User = require('../models/user');
var bodyParser = require('body-parser');

//Middleware

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


router.get('/signup', function(req, res, next){
    res.render(accounts/signup);
});

router.post('/signup', function(req, res, next){
    var user = new User();

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