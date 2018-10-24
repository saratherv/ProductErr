module.exports = (req,res,next)=>{

let cities = req.body.cities.split(',');
let hotels = req.body.hotels.split(',');
let flights = req.body.flights.split(',');

let obj = {};
let i = 1;
hotels.forEach(function (data) {
    obj['day' + i] = data
    i += 1
})

let obj2 = {};
i = 1
flights.forEach((element) => {
    obj2['day' + i] = element
    i += 1
})

req.body.flights = obj2
req.body.hotels = obj
req.body.cities = cities.split(",")

console.log('booking insert middleware called')

next()
}