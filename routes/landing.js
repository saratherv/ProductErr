var express = require('express');
var Request = require("request");
var fs = require("fs");
var dateFormat = require('dateformat');
var Itineary = require('../Database/models/Itineary')
var User = require("../Database/models/Users")
var router = express.Router();

// var trip=[
//     {id:1, dur:'3 night',tript:'Experience True and Authentic Greece', auth:'By Ryan Shirley', tripp:'1256', tripc:'AED',origin:"SFO",Destination:"LAX"}
// ];

router.get('/', function (req, res) {
    Itineary.find({}, (err, itineary )=> {
        if (err) {
            console.log("cannot find an itneary!!! ... some error occcured!!", err)
        }
        else {
            console.log(req.headers);
            // console.log(req.headers.cookie.split(';')[1].split("=")[0] )
            // let cooki = req.headers.cookie.split(';').indexOf('cookiename')
                if(req.headers.cookie != undefined && (req.headers.cookie.split(';')[0]).split("=")[0] === 'cookieName'){
                    console.log(req.headers.cookie.split(';')[0].split("=")[1])
                id = req.headers.cookie.split(';')[0].split("=")[1]
                User.findOne({id:id},(err, user)=>{
                    if (err) console.log("error in finding cookie ", err)
                    else
                    req.session.email = user.email_id
                    console.log("Request.session      ", req.session) 
                })
            }

            console.log(JSON.stringify(itineary))
            res.render('home', {
                items: itineary
            });
    
        }
    })

});

module.exports = router;