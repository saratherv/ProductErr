var express = require('express');
var Request = require("request");
var fs = require("fs");
var dateFormat = require('dateformat');
var Itineary = require('../Database/models/Itineary')
var router = express.Router();



router.get('/privacy', function (req, res) {
   res.render('privaclp')
});

router.get('/cookie', function (req, res) {
    res.render('cookiepolicy')
 });

module.exports = router;