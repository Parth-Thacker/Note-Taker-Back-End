const express = require('express');
const router = express.Router();
 const dotenv = require("dotenv")
const USER = require('../models/userModel');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
dotenv.config()
const secretKey = process.env.SECRET_KEY
router.post('/login', async (req,res)=>{
   try{
     const {email,password} = req.body;
     console.log(req.body)
     const user = await USER.findOne({email:email})
     if(!user){
        return res.status(422).json({
            error:"user not found"
        })
     }
     bcrypt.compare(password,user.password,(err,result)=>{
        if(err){
           return res.status(500).json({
            error:err
        })
        }
        if(result){
            const token = jwt.sign({_id:user.id},secretKey)
            res.status(200).json({
                message:"login successfully",
                token:token,
                user
            })
        }
        else{
            return res.status(422).json({
                error: "Invalid Credentials"
            })
        }
     })
   }
   catch{
    res.status(422).json({
        error:"server error"
    })
   }
    
})

module.exports = router