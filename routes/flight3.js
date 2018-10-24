var express = require('express');
var Request = require("request");
var moment = require('moment');
var dateFormat = require('dateformat');
const date = require('date-and-time');
const places = require('../Database/models/Place')
var Itineary = require('../Database/models/Itineary');
var mychoice;
var cart = require('../Database/models/Cart');


var router = express.Router();

router.get('/adding', (req,res)=>{
    res.render('info',
        titrip = {
            title : req.session.triptitle
        }
    )
})

router.post('/adding', function (req, res) {
    req.session.traveld = req.body.ddate;
    console.log(req.session.traveld);
    var adl = (Number)(req.body.adultplus) + (Number)(req.body.adultminus);
    console.log(adl);
    if (adl > 0) {
        req.session.adlt = adl;
    }
    else {
        req.session.adlt = 0;
    }
    var chl = (Number)(req.body.childplus) + (Number)(req.body.childminus);
    if (chl > 0)
        req.session.chid = chl;
    else
        req.session.chid = 0;
    console.log(chl);
    req.session.traveljstart = req.body.Destination;
   // res.redirect('/flight');
   var title = req.session.triptitle;
   var rr=0,count=[],jj=0;
   let obj = { "TripType": "O", "NoOfAdults": 0, "NoOfChilds": 0, "NoOfInfants": 0, "ClassType": "Economy", "OriginDestination": [{ "Origin": "", "Destination": "", "TravelDate": "" }], "Currency": "USD" };
   Itineary.findOne({ title: title}, (error, itineary) => {
    if (error) console.log("cannot find itineary in extrabook")
    else {

        rr =itineary.flights;
        for (var i = 0; i < Object.keys(rr).length; i++) {
            if (rr['day' + (i + 1)] != null) {
                count[i]=(i+1);
                console.log(count[i]);
            }
        }
                obj.OriginDestination[0].TravelDate = dateFormat(req.session.traveld, "mm/dd/yyyy");
                obj.NoOfAdults = req.session.adlt;
                obj.NoOfChilds = req.session.chid;
                obj.OriginDestination[0].Origin = req.session.traveljstart;
                obj.OriginDestination[0].Destination = itineary.flights.day1[1];
                Request.post({
                    "headers": { "mode": "sandbox", "content-type": "application/json", "apikey": "7e75db03-9b7d-4" },
                    "url": "https://dev-sandbox-api.airhob.com/sandboxapi/flights/v1.3/search",
                    "body": JSON.stringify(obj)
                    
                }, (error, response, body) => {
                    if (error) {
                        return console.dir(error);
                    }
                    result = JSON.parse(body);
                    req.session.searchresult=JSON.stringify(result);
                    //ans[0] = JSON.stringify(result[0])
                    console.dir(JSON.stringify(result));
                    if (result.OneWayAvailabilityResponse.TrackId == null) {
                        res.render('error', {
                            esrr: result.Message
                        })
                    }
                    else{
                        console.log()
                        res.render('ItinearyFlight',{
                            moment: moment,
                            tripdet: itineary,
                            allf: result.OneWayAvailabilityResponse.ItinearyDetails[0].Items,
                            val: 1,
                            daybook:count,
                            nextval:null,
                            selected:null,
                            dat:req.session.traveld,
                            error:"no"

                        })
                    }
                });
    }
});
});



module.exports = router;