// this controller is used to get bookings by emailid
// called when '/bookingByName/:name'

const Booking = require('../Database/models/Booking')

module.exports = async (req, res) => {
    await Booking.find({ email_id: req.params.email_id }, (err, bookings) => {
        if (err) console.log('Cannot get Bookings due to some error ', err)
        else {
            console.log('bookings Found \n', bookings)
            res.send(JSON.stringify(bookings))
        }
    })
}