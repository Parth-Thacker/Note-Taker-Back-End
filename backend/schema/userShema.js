const mongoose = require("mongoose")

const schema = mongoose.Schema

const UserSchema = new schema({
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    confirmPassword:{type:String,require:true}
})

const UserModel = mongoose.model("Users",UserSchema)

module.exports=UserModel