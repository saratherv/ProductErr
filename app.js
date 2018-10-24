var express=require('express');
var path=require('path');
var session = require('express-session');
const mongoose = require('mongoose')
var bodyParser=require('body-parser');
var moment = require('moment');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var Cookie = require('cookies');
var converter = require('number-to-words');
var recombee = require('recombee-api-client');
var rqs = recombee.requests;
var client = new recombee.ApiClient('thetrift', 'CfRWHskHSEXdJbxq7uWQuezYljXVN9OwNGMzmiSXlF0Ciar1AFdRuou4cTRcMBZ0');
var app=express();



//connection to database
mongoose.connect("mongodb+srv://trift:trift@cluster0-nokdi.mongodb.net/thrift?retryWrites=true",{useNewUrlParser:true},(err,client)=>{
    if(err){        console.log(err)
    }
    else{
        console.log("successfully connected to DB!!")  }    
})

//configure app
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.locals.moment = require('moment');



//papport
passport.use(new GoogleStrategy({
    clientID: '982001829361-2qr6makd9cccn583761bghqll7u0htlm.apps.googleusercontent.com',
    clientSecret: '8hWdDx7cukRtHTo67IeVF5_e',
    callbackURL: "http://localhost:1337/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
));

// middleware
app.use(session({secret:'triftsession'}));
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

//define routes
app.use(require('./routes/landing'))
app.use(require('./routes/signup'))
app.use(require('./routes/log'))
app.use(require('./routes/inforoute'))
app.use(require('./routes/flight3'))
app.use(require('./routes/extraite'))
app.use(require('./routes/privacp.js'))
app.use(require('./routes/booking.js'))
app.use(require('./routes/theend.js'))
app.use(require('./routes/lookroute'))
app.use(require('./routes/nextdayflightroute'))
app.use(require('./routes/finalroute'))
app.use(require('./routes/itinearycall'))
app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));


  app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

// server
app.listen(3003, function(){
    console.log('ready on port 3003');
});
