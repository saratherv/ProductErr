var express = require('express');
var Request = require("request");
var moment = require('moment');
var dateFormat = require('dateformat');
const date = require('date-and-time');
const places = require('../Database/models/Place')
var Itineary = require('../Database/models/Itineary');
var cart = require('../Database/models/Cart');




var router=express.Router();


router.get('/flightdetails',function(req,res){
    var z=req.param('parm');
    var title = req.session.triptitle;
    var rr,count=[],value=req.param('parm2'),tosetvalue;
    Itineary.findOne({ title: title}, (error, itineary) => {
        if (error) console.log("cannot find itineary in extrabook")
        else {
    
            rr =itineary.flights;
            for (var i = 0; i < Object.keys(rr).length; i++) {
                if (rr['day' + (i + 1)] != null) {
                    count[i]=(i+1);
                }
            }
            for (var i = value; i < Object.keys(rr).length; i++) {
                if (rr['day' + (i + 1)] != null) {
                    tosetvalue=(i+1);
                    console.log(tosetvalue+'tosetvalue')
                }
            }}

   var searchResponse=req.session.searchresult;
   var x=JSON.parse(searchResponse);
   console.log(req.param('parm2'));
   console.log(x)
   console.log(x.OneWayAvailabilityResponse.TrackId)
   if(x!=null){
   var look = { "TrackId": "", "ItinearyDetails": { "Segments": [{ "ValidatingCarrier": "", "Price": "", "item": [{ "FlightID": "", "FlightNum": "", "CarrierId": "", "AircraftType": "", "Origin": "", "Destination": "", "DepartureDateTime": "", "ArrivalDateTime": "", "ClassCode": "", "EquipmentType": "", "OperatingCarrierId": "", "Meal": null, "OrgTerminal": "", "DestTerminal": "", "MajorClassCode": "", "Baggage": " ", "Duration": "", "ApiProvider": "", "MarriageGroup": "", "IsStopAirport": "" }] }] } };
   look.TrackId = x.OneWayAvailabilityResponse.TrackId;
   console.log(look.TrackId);

   look.ItinearyDetails.Segments[0].ValidatingCarrier = x.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].ValidatingCarrier;
   look.ItinearyDetails.Segments[0].Price = x.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].FareDescription.PaxFareDetails[0].OtherInfo.GrossAmount;
   look.ItinearyDetails.Segments[0].item[0].FlightID = x.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].FlightDetails[0].FlightID;
   look.ItinearyDetails.Segments[0].item[0].FlightNum = x.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].FlightDetails[0].FlightNum;
   look.ItinearyDetails.Segments[0].item[0].CarrierId = x.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].FlightDetails[0].CarrierCode;

   look.ItinearyDetails.Segments[0].item[0].Origin = x.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].FlightDetails[0].Origin;
   look.ItinearyDetails.Segments[0].item[0].Destination = x.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].FlightDetails[0].Destination;
   console.log('look ki origin' + look.ItinearyDetails.Segments[0].item[0].Origin)
   console.log('look ka destination' + look.ItinearyDetails.Segments[0].item[0].Destination)
   look.ItinearyDetails.Segments[0].item[0].DepartureDateTime = x.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].FlightDetails[0].DepartureDateTime;
   look.ItinearyDetails.Segments[0].item[0].ArrivalDateTime = x.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].FlightDetails[0].ArrivalDateTime;
   look.ItinearyDetails.Segments[0].item[0].ClassCode = x.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].FlightDetails[0].ClassCode;
   look.ItinearyDetails.Segments[0].item[0].EquipmentType = x.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].FlightDetails[0].AirEquipType;
   look.ItinearyDetails.Segments[0].item[0].OperatingCarrierId = x.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].FlightDetails[0].CarrierCode;
   look.ItinearyDetails.Segments[0].item[0].OrgTerminal = x.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].FlightDetails[0].OrgTerminal;
   look.ItinearyDetails.Segments[0].item[0].DestTerminal = x.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].FlightDetails[0].DesTerminal;
   look.ItinearyDetails.Segments[0].item[0].Duration = x.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].FlightDetails[0].Duration;
   look.ItinearyDetails.Segments[0].item[0].ApiProvider = x.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].ApiProvider;
 // look.ItinearyDetails.Segments[0].item[0].ApiProvider = 'SB';
   look.ItinearyDetails.Segments[0].item[0].MarriageGroup = x.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].FlightDetails[0].MarriageGroup;
   look.ItinearyDetails.Segments[0].item[0].IsStopAirport = x.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].FlightDetails[0].IsStopAirport;
   look.ItinearyDetails.Segments[0].item[0].MajorClassCode=x.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].FlightDetails[0].MajorClassCode;
   look.ItinearyDetails.Segments[0].item[0].Meal=x.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].FlightDetails[0].MealCode.MealCode;
   look.ItinearyDetails.Segments[0].item[0].Baggage=x.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].FlightDetails[0].Baggage;
   }
   if (look.TrackId != null && look.ItinearyDetails.Segments[0].item[0].ApiProvider != null) {
    console.log('loook ik request hai ye' + JSON.stringify(look));
    Request.post({
        "headers": { "mode": "sandbox", "content-type": "application/json", "apikey": "7e75db03-9b7d-4" },
        "url": " https://dev-sandbox-api.airhob.com/sandboxapi/flights/v1.1/look",
        "body": JSON.stringify(look)
    }, (error, response, body) => {
        if (error) {
            console.dir(error);
            res.render('error', {
                err: error
            });
        }
        else {
            result = JSON.parse(body);
            req.session.lookdata=JSON.stringify(result);
            console.log(JSON.stringify(result));
            if(result.Message=="success"){
            res.render('ItinearyFlight',{
                moment: moment,
                tripdet: itineary,
                allf: x.OneWayAvailabilityResponse.ItinearyDetails[0].Items,
                nextval: tosetvalue,
                val:value,
                daybook:count,
                selected:z,
                dat:req.session.traveld,
                error:"no"
            })}
            else{
                
                res.render('ItinearyFlight',{
                    moment: moment,
                    tripdet: itineary,
                    allf: x.OneWayAvailabilityResponse.ItinearyDetails[0].Items,
                    nextval: tosetvalue,
                    val:value,
                    daybook:count,
                    selected:z,
                    dat:req.session.traveld,
                    error:"error"
                }) 
            }
        }
    }
)}
});
})




 module.exports=router;