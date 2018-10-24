// this controller is used to register user details given from the html web page by request
//works upon POST request on url '/user'

const Users = require("../Database/models/Users")

module.exports = (req,res)=>{
    console.log(req.body)

Users.create({
    name:req.body.name,
    email_id:req.body.email_id,
    password:req.body.password
},(err, user)=>{
    if(err)console.log("Error inserting user", err)
    else{
        console.log("user entered successfully")
        console.log(user)
    }
})
}