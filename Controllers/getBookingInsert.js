// this controller is used to insert bookings 
//called when post request is made to '/bookings'

const Booking = require('../Database/models/Booking')
const date = require('date-and-time');

module.exports = (req, res) => {

    console.log(req.body.cities)
    console.log(req.body.hotels)
    let depdate = new Date(req.body.date);
    const date2 = date.format(depdate, 'YYYY-MM-DD HH:mm:ss');
    
    Booking.create({
        booking_id: req.body.booking_id,
        email_id: req.body.email_id,
        name: req.body.name,
        contact_no: req.body.contact_no,
        origin: req.body.origin,
        destination: req.body.destination,
        cities: req.body.cities,
        days: req.body.days,
        flights: req.body.flights,
        hotels: req.body.hotels,
        activities: req.body.activities,
        reminders: req.body.reminders,
        departure: date2,
        comments: req.body.comments,
        trip_id: req.body.trip_id

    },(err, booking)=>{
        if(err)console.log("cannot make the booking!!! Please try again later",err)
        else{
            console.log("Booking done successfully")
        }
    })
}