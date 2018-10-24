const mongoose = require('mongoose')

const PlaceSchema = new mongoose.Schema({
code:{type: String, unique:true},
city:String,
lat:String,
lng:String,
country:String,
name:String
})

const Place = mongoose.model("Place",PlaceSchema)

module.exports = Place