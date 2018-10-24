// this controller is used to get itniearies by name
// called when '/getItinearyByName/:name'

const Itineary = require('../Database/models/Itineary')

module.exports = async (req, res) => {
    await Itineary.find({ title: req.params.name }, (err, itniearies) => {
        if (err) console.log('Cannot get Itinearies due to some error ', err)
        else {
            console.log('Itinearies Found \n', itniearies)
            res.send(JSON.stringify(itniearies))
        }
    })
}