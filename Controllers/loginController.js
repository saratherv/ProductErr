const User = require('../Database/models/Users')
const bcrypt = require('bcrypt')

module.exports = (req,res)=>{
    const {email_id , password } = req.body;
    User.findOne({email_id:email_id},(err,user)=>{
        if(err) console.log("error logging in")
        if(user){
            bcrypt.compare(password, user.password,(error,match)=>{
                if(match)console.log("Login Successfully")
                else console.log("please enter correct details")
            })
        }
    })

}