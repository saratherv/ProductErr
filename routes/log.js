var express = require('express');
var Request = require("request");
var fs = require("fs");
var dateFormat = require('dateformat');
var Itineary = require('../Database/models/Itineary')
var router = express.Router();
const User = require('../Database/models/Users');
const bcrypt = require('bcrypt')
// var trip=[
//     {id:1, dur:'3 night',tript:'Experience True and Authentic Greece', auth:'By Ryan Shirley', tripp:'1256', tripc:'AED',origin:"SFO",Destination:"LAX"}
// ];

router.post('/lognow', function (req, res) {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    const url = req.body.url;
    console.log(url)
    if (email != "" && password !="") {
        User.findOne({ email_id: email }, (err, user) => {
            if (err){ console.log("error logging in")
            res.render('relogin');
        }
            if (user) {
                console.log("user found",user)
                 bcrypt.compare(password, user.password, (error, match) => {
                    if (match) {
                        
                        console.log("Login Successfully")
                        res.cookie('cookieName', user.id, { maxAge: 9000000 });
                        console.log('cookie created successfully');
                        res.redirect(url);
                    }
                    else {
                        console.log(user.password)
                        console.log("please enter correct details")
                        res.render('relogin');
                        
                    }
                })
            }
        })
    }
    else {
        res.redirect('relogin')
    }
    
});

module.exports = router;