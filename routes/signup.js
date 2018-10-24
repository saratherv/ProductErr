var express = require('express');
var Request = require("request");
var fs = require("fs");
var dateFormat = require('dateformat');
var Itineary = require('../Database/models/Itineary')
var router = express.Router();
var Users = require('../Database/models/Users');
const Preference = require('../Database/models/Preference');
var zomato = require('zomato');
var client = zomato.createClient({
  userKey: 'a2a5166f04f1b1a4cdbcb15dfb8163b8', //as obtained from [Zomato API](https://developers.zomato.com/apis)
});

// var trip=[
//     {id:1, dur:'3 night',tript:'Experience True and Authentic Greece', auth:'By Ryan Shirley', tripp:'1256', tripc:'AED',origin:"SFO",Destination:"LAX"}
// ];

router.post('/saveuser', function (req, res) {
  console.log(req.body);
  Users.create({
    name: req.body.name,
    email_id: req.body.email,
    password: req.body.password,
    number: req.body.number,
    lastname: req.body.lastname,
    id: Math.random().toString(36).substring(2,10)      
  }, (err, user) => {
    if (err) console.log("Error inserting user", err)
    else {
      console.log("user entered successfully")
      console.log(user)
      req.session.email = user.email_id
    }
  })
  res.render('signprof', { email : req.body.email})
  

});



router.post('/savepref', function (req, res) {
  console.log(req.body);
Preference.create({
  email_id: req.body.email,
  travel : req.body.flightvalue,
  cusine : req.body.foodvalue,
  local_transport : req.body.localtvalue,
  hotel : req.body.hotelvalue,
  activites : req.body.activityvalue
}, (err, preference)=>{
  if(err) console.log("Error in saving preferences,  ", err)
  else 
  console.log('Preferences Saved !!', preference)
})

  res.redirect('/');
});


module.exports = router;