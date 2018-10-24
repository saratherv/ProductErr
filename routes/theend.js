var express=require('express');
var Request = require("request");
var fs = require("fs");
const places = require('../Database/models/Place')



var router=express.Router();

router.post('/finaladding',(req,res)=>{
    console.log(req.body);
})

 module.exports=router;