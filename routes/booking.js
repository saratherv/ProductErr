var express=require('express');
var Request = require("request");
var fs = require("fs");
const places = require('../Database/models/Place')
var converter = require('number-to-words');
var Itineary = require('../Database/models/Itineary');


var router=express.Router();


router.get('/checkout', function(req,res){
    var total=(Number)(req.session.adlt)+(Number)(req.session.chid);
    var lookresponse=JSON.parse(req.session.lookdata);
    console.log(lookresponse);
    var price=lookresponse.PricingInfo[0].GrossAmount;
    var title = req.session.triptitle;
    Itineary.findOne({ title: title }, (error, itineary) => {
        if (error) console.log("cannot find itineary in extrabook")
        else {
    
    console.log(price)
    res.render('checkout',{
        
        convert:converter,
        total:total,
        price:price,
        tripdet:itineary
    });
}});
 });




 module.exports=router;