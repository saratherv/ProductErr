// this controller is used to get itniearies by number of days
// called when '/getItinearyByDay/:day'

const Itineary = require('../Database/models/Itineary')

module.exports = async (req, res) => {
    await Itineary.find({ days: req.params.day }, (err, itniearies) => {
        if (err) console.log('Cannot get Itinearies due to some error ', err)
        else {
            console.log('Itinearies Found \n', itniearies)
            res.send(JSON.stringify(itniearies))
        }
    })
}