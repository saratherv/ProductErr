const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    booking_id:{type:String,required:true,unique:true},
    email_id:{type:String , required:true},
    triptitle : String,
    tripid : String,
    sellrequestid :String,
    airlinepnr:String

    
})

const Booking = mongoose.model("Booking",BookingSchema)

module.exports = Booking