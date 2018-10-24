var express=require('express');
var Request = require("request");
var fs = require("fs");
var moment = require('moment');
const Itineary = require("../Database/models/Itineary");



var router=express.Router();

router.get('/callitineary',(req,res)=>{


    Request.get({
        "headers": { "mode": "sandbox", "content-type": "application/json", "apikey": "7e75db03-9b7d-4" },
        "url": "https://dev-sandbox-api.airhob.com/sandboxapi/flights/v1.1/itinerary?tripid="+req.param('parem'),
    },function(err,response,body){
      if(err) console.log(err)
      if(res.statusCode !== 200 ) {
          console.log(body)
      }
      else{
          console.dir(body)
          var result=JSON.parse(body);
          var title = req.session.triptitle;
          Itineary.findOne({ title: title}, (error, itineary) => {
            if (error) console.log("cannot find itineary in extrabook")
            else {
        
          res.render('success2',{
              itires:result,
              moment:moment,
              trip:itineary
          })}})
      }
     
    });
    
});


 module.exports=router;