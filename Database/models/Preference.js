const mongoose = require('mongoose')

const PreferenceSchema = new mongoose.Schema({
    email_id: {type: String, required: true, unique: true},
    travel : String,
    cusine : String,
    local_transport : String,
    hotel : String,
    activites : String
})

const Preference = mongoose.model("Preference",PreferenceSchema)

module.exports = Preference;