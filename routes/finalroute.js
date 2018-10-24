var express=require('express');
var Request = require("request");
var fs = require("fs");
var dateFormat = require('dateformat');
const Itineary = require("../Database/models/Itineary");
const Booking = require('../Database/models/Booking')


var router=express.Router();

var result=null,issueresult=null;
router.post('/priceAndIssue',(req,res)=>{
console.log(req.body);
var price={ "sellRequestId": "", "customer": { "PhoneNumber": "", "CountryCode": "91", "Email": "", "CustomerDetails": [ ] } };
x={ "PassengerType": "ADT", "Title": "", "FirstName": "", "LastName": "", "NationalityCountry": "India", "DOB": { "Day": "12", "Month": "09", "Year": "1990" }, "PassportNumber": "31195856", "IssueCountry": "India", "PassportExpiryDay": "23", "PassportExpiryMonth": "09", "PassportExpiryYear": "2021" }
var issue={"sellRequestId":""};
var sessionres=JSON.parse(req.session.lookdata);
var child=(Number)(req.session.chid), adult=(Number)(req.session.adlt);

if((child+adult)==1){
var price={ "sellRequestId": "ao0n1nKFAjjp9LT7YPYnhQ==", "customer": { "PhoneNumber": "", "CountryCode": "", "Email": "", "CustomerDetails": [ { "PassengerType": "ADT", "Title": "", "FirstName": "", "LastName": "", "NationalityCountry": "", "DOB": { "Day": "", "Month": "", "Year": "" }, "PassportNumber": "", "IssueCountry": "", "PassportExpiryDay": "", "PassportExpiryMonth": "", "PassportExpiryYear": "" } ] } };
    price.sellRequestId=sessionres.SellRequestId;
issue.sellRequestId=sessionres.SellRequestId;
console.log('yaha bi toh dekhu zara'+issue.SellRequestId)
price.customer.PhoneNumber=req.body.primaryno;
price.customer.CountryCode=req.body.primarycode;
price.customer.Email=req.body.primaryemail;
price.customer.CustomerDetails[0].Title=req.body.primarysalutation;
price.customer.CustomerDetails[0].FirstName=req.body.primaryname;
price.customer.CustomerDetails[0].LastName=req.body.primarysurname;
price.customer.CustomerDetails[0].DOB.Day=dateFormat(req.body.primarydob,'dd');
price.customer.CustomerDetails[0].DOB.Month=dateFormat(req.body.primarydob,'mm');
price.customer.CustomerDetails[0].DOB.Year=dateFormat(req.body.primarydob,'yyyy');
price.customer.CustomerDetails[0].PassportNumber=req.body.primarypno;
price.customer.CustomerDetails[0].PassportExpiryDay=dateFormat(req.body.primaryexp,'dd');
price.customer.CustomerDetails[0].PassportExpiryMonth=dateFormat(req.body.primaryexp,'mm');
price.customer.CustomerDetails[0].PassportExpiryYear=dateFormat(req.body.primaryexp,'yyyy');
price.customer.CustomerDetails[0].NationalityCountry=req.body.primarynation;
price.customer.CustomerDetails[0].IssueCountry=req.body.primaryissuingcountry;
}
else{
    price.sellRequestId=sessionres.SellRequestId;
issue.sellRequestId=sessionres.SellRequestId;
console.log('yaha bi toh dekhu zara'+issue.SellRequestId)
price.customer.PhoneNumber=req.body.primaryno[0];
price.customer.CountryCode=req.body.primarycode[0];
price.customer.Email=req.body.primaryemail[0];
for(var i=0;i<(adult+child);i++){
    price.customer.CustomerDetails[i]= { "PassengerType": "ADT", "Title": req.body.primarysalutation[i], "FirstName": req.body.primaryname[i], "LastName": req.body.primarysurname[i], "NationalityCountry": req.body.primarynation[i], "DOB": { "Day": dateFormat(req.body.primarydob[i],'dd'), "Month": dateFormat(req.body.primarydob[i],'mm'), "Year": dateFormat(req.body.primarydob[i],'yyyy') }, "PassportNumber": req.body.primarypno[i], "IssueCountry": req.body.primaryissuingcountry[i], "PassportExpiryDay": dateFormat(req.body.primaryexp[i],'dd'), "PassportExpiryMonth": dateFormat(req.body.primaryexp[i],'mm'), "PassportExpiryYear": dateFormat(req.body.primaryexp[i],'yyyy') }
/*price.customer.CustomerDetails[0].Title=req.body.primarysalutation;
price.customer.CustomerDetails[0].FirstName=req.body.primaryname;
price.customer.CustomerDetails[0].LastName=req.body.primarysurname;
price.customer.CustomerDetails[0].DOB.Day=dateFormat(req.body.primarydob,'dd');
price.customer.CustomerDetails[0].DOB.Month=dateFormat(req.body.primarydob,'mm');
price.customer.CustomerDetails[0].DOB.Year=dateFormat(req.body.primarydob,'yyyy');
price.customer.CustomerDetails[0].PassportNumber=req.body.primarypno;
price.customer.CustomerDetails[0].PassportExpiryDay=dateFormat(req.body.primaryexp,'dd');
price.customer.CustomerDetails[0].PassportExpiryMonth=dateFormat(req.body.primaryexp,'mm');
price.customer.CustomerDetails[0].PassportExpiryYear=dateFormat(req.body.primaryexp,'yyyy');
price.customer.CustomerDetails[0].NationalityCountry=req.body.primarynation;
price.customer.CustomerDetails[0].IssueCountry=req.body.primaryissuingcountry;*/

}}

var title = req.session.triptitle;
Request.post({
    "headers": { "mode": "sandbox", "content-type": "application/json", "apikey": "7e75db03-9b7d-4" },
    "url": "https://dev-sandbox-api.airhob.com/sandboxapi/flights/v1.1/price",
    "body": JSON.stringify(price)
}, (error, response, body) => {
    if (error) {
        return console.dir(error);
    }
    result = JSON.parse(body);
    console.dir(result);
    if(result!=null){
        Request.post({
            "headers": { "mode": "sandbox", "content-type": "application/json", "apikey": "7e75db03-9b7d-4" },
            "url": "https://dev-sandbox-api.airhob.com/sandboxapi/flights/v1.1/issue",
            "body": JSON.stringify(issue)
        }, (error, response, body) => {
            if (error) {
                return console.dir(error);
            }
            issueresult = JSON.parse(body);
            console.dir('final result'+JSON.stringify(issueresult));
            if(issueresult.IssueTicketSuccess==true){
                //console.log('email hai ye'+ req.cookies.split(';')[1].split('=')[1])
               
                Booking.create({
                    booking_id:""+Math.random(),
                     email_id:req.body.primaryemail,
                    triptitle :req.session.triptitle,
                    tripid : issueresult.TripId,
                    sellrequestid :issueresult.SellRequestId,
                    airlinepnr:issueresult.Segments[0].SegmentPnrs[0].AirlinePnr
                
                }, (err,booking)=>{
                    if(err){console.log("error in saving bookings!!!!",err)
                    

                }
                    else{
                        console.log("Bookings done Successfully!!!! Enjoy your trip!!!! \n",booking)
                    }
                })
                Itineary.findOne({ title: title}, (error, itineary) => {
                    if (error) console.log("cannot find itineary in extrabook")
                    else {
                
                var count=((Number)(req.session.chid)+(Number)(req.session.adlt));
                
                res.render('success',{
                    pnr:issueresult.Segments[0].SegmentPnrs[0].AirlinePnr,
                    tripid:issueresult.TripId,
                    count:count,
                    trip:itineary
                }
            )}});
            }
            else{
                res.render('enderror',{
                 
                })
            }
        })
    }
    
});

console.log(JSON.stringify(price));
console.log(issue);
});



 module.exports=router;