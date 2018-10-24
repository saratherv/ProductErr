const mongoose = require('mongoose');

const ItinearySchema = new mongoose.Schema({
   title:{type:String,required:true, unique:true},
   days:Number,
   start:String,
   destination:String,
   cities:Array,
   hotels:Object,
   flights:Object,
   link:String,
   trip_id:String,
   currency:{type:String},
   auth: {typr:String},
   price: Number,
   city:Object
})

const Itineary = mongoose.model("Itineary",ItinearySchema)

module.exports = Itineary
