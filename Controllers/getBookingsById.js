// this contorller is called when request is made to '/getBookingById'
//this controller takes booking id and fetch all the details from the database

const Booking = require('../Database/models/Booking')

module.exports = async (req, res) => {
    await Booking.find({ booking_id: req.params.booking_id }, (err, booking) => {
        if (err) console.log("Error in finding bookings!", err);
        else {
            console.log("Bookings found!!!!1")
            console.log(booking)
            res.send(JSON.stringify(booking))
        }
    })
}