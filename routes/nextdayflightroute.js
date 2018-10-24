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

router.get('/flightnext',(req,res)=>{
    var z=req.param('parama');
    var title = req.session.triptitle;
    let obj = { "TripType": "O", "NoOfAdults": 0, "NoOfChilds": 0, "NoOfInfants": 0, "ClassType": "Economy", "OriginDestination": [{ "Origin": "", "Destination": "", "TravelDate": "" }], "Currency": "USD" };
    Itineary.findOne({ title: title}, (error, itineary) => {
        if (error) console.log("cannot find itineary in extrabook")
        else {
                var rr=0,count=[],jj=0;
                rr =itineary.flights;
                for (var i = 0; i < Object.keys(rr).length; i++) {
                if (rr['day' + (i + 1)] != null) {
                count[i]=(i+1);
                console.log(count[i]);
                     }
                 }
                var tomorrow = new Date(req.session.traveld);
                tomorrow.setDate(tomorrow.getDate() + Number(z));
                obj.OriginDestination[0].TravelDate = dateFormat(tomorrow, "mm/dd/yyyy");
                obj.NoOfAdults = req.session.adlt;
                obj.NoOfChilds = req.session.chid;
                obj.OriginDestination[0].Origin = itineary.flights['day'+z][0];
                if(itineary.flights['day'+z][1]!=null){
                    obj.OriginDestination[0].Destination=itineary.flights['day'+z][1];
                }
                else{
                    obj.OriginDestination[0].Destination=req.session.traveljstart;
                }
                console.log('next day ka origin'+obj.OriginDestination[0].Origin);
                console.log('next day ka dest'+obj.OriginDestination[0].Destination);
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
                    console.dir(result);
                    if (result.OneWayAvailabilityResponse.TrackId == null) {
                        res.render('error', {
                            esrr: result.Message
                        })
                    }
                    else{
                        res.render('ItinearyFlight',{
                            moment: moment,
                            tripdet: itineary,
                            allf: result.OneWayAvailabilityResponse.ItinearyDetails[0].Items,
                            val: z,
                            daybook:count,
                            nextval:null,
                            selected:null,
                            dat:req.session.traveld,
                            error:"no"
                        })
                    }
                });
        
        
        
        
            }})
    
})


module.exports = router;