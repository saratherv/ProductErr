var express = require('express');
var moment = require('moment');
var Request = require("request");
var dateFormat = require('dateformat');
var router = express.Router();
var Itineary = require('../Database/models/Itineary');
var ct = 0;

var hotel = { "Day1": "Yria Hotel, Zakynthos", "Day2": "Yria Hotel, Zakynthos", "Day3": "Best of Athens Apartment, Athens", "Day4": "Hotel Tisikeli, Kalabaka (Meteora)", "Day5": "Hotel Tisikeli, Kalabaka" };
var fldata;
var Cart = require('../Database/models/Cart')

router.get('/exbook', function (req, res) {
  
    var title = req.session.triptitle;
    Itineary.findOne({ title: title }, (error, itineary) => {
        if (error) console.log("cannot find itineary in extrabook")
        else {
            console.log(req.session.traveld)
            var tomorrow = new Date(req.session.traveld);
            let a = (Number)(req.param("par"))
            console.log(a)
                tomorrow.setDate(tomorrow.getDate() + a);
                var d = dateFormat(tomorrow, "yyyy-mm-dd");
                var obj = {
                    moment: moment,
                    hotl: hotel["Day"+a],
                    dat: d,
                    city:itineary.city["day"+a],
                    a:a,
                    trip:itineary,
                    start:req.session.traveld

                }
                console.log(obj) 
                res.render('bookite', obj)
                 }
           
        })
        fldata=null;
    })

   
    
    
    module.exports = router;