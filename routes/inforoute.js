var express=require('express');
var Request = require("request");
var fs = require("fs");
const Itineary = require("../Database/models/Itineary");



var router=express.Router();


router.get('/info', function(req,res){
   console.log(req.param('partit'));
  var title = req.param('partit');
   req.session.triptitle=req.param('partit');
   var cookie = req.headers.cookie.split(';')[1];
// if(cookie!='cookieName=loggedin'){
//   res.redirect('/')
// }
//    console.log(cookie)
//console.log('email hai ye'+ req.headers.cookie.split(';')[2].split('=')[1])
  Itineary.findOne({title:title}, (err, itineary)=>{
    if(err) console.log("cannot find the itneary of title ", partit, " Error occurred ", err);
    else{
      console.log("Itineary found!!!!!")
      console.log(itineary)
      res.render('info',{
        titrip:itineary
    });
    }
  })
 });




 module.exports=router;