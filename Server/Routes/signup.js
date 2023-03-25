const express = require("express")
const USER = require("../models/userModel")
const bcrypt = require("bcrypt")

const router = express.Router()

router.post("/signup",async (req,res)=>{
   try{
    const {email,password} = req.body
   const user = await USER.findOne({email:email})
   if(user){
    return res.status(409).json({
        error:"user already exists"
    })
   }
   else{
    bcrypt.hash(password,10, async(err,hash)=>{
        if(err){
            return res.status(422).json({
                error:err
            })
            
        }
        else{
            const newUser = await USER.create({
                email,
                password: hash
            })

            res.status(200).json({
                message:"user registered successully",
                newUser
            })
        }
    })
    
   }
   }
   catch(e){
    res.status(400).json({
        error:e.error,
    })
   }
})

module.exports = router