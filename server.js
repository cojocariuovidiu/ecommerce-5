var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');

var User = require('./models/user.js');

var router = express();

mongoose.connect('mongodb://localhost:27017/ecommerce', function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Connected to the database");
    }

});

//Middleware
router.use(express.static(__dirname + '/public'));
router.use(morgan('dev'));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.engine('ejs', engine);
router.set('view engine','ejs')

var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');

router.use(mainRoutes);
router.use(userRoutes);


router.listen(3000, function(err){
    if(err) throw err;
    console.log("Server is Running");
});


