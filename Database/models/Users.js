const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    email_id:{type:String,required:true,unique:true},
    password:{type:String,required:true},
     name:String,
     lastname:String,
     number:Number,
     id: String
})

const Users = mongoose.model("Users",UserSchema)

UserSchema.pre('save', function(next){
const user = this;

bcrypt.hash(user.password, 10 , function(err,encrypted){
    if(!err)
    user.password = encrypted
    next()
})
})

module.exports = Users