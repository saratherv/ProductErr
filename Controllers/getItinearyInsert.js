//this controller is used to save a new itineary in the databsae
// gets called when a post request is made to '/bookNewItineary'

const Itineary = require('../Database/models/Itineary')

module.exports = (req, res) => {
    Itineary.create({
        title: req.body.title,
        days: req.body.days,
        start: req.body.start,
        destination: req.body.end,

        cities: req.body.cities,
        hotels: req.body.hotels,
        flights: req.body.flights,
        link: req.body.link,
        trip_id: req.body.trip_id,
        currency : req.body.currency,
        auth :req.body.auth,
        price : req.body.price

    }, (err, data) => {
        if (err) console.log("cannot insert itineary due to some error:\n", err)
        else console.log('itineary created')
    })

}