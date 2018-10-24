const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
item_no:Number,
user:String,
response: Array,
itineary:String,
deptdate:Date

})

const Cart = mongoose.model("Cart",CartSchema)

module.exports = Cart