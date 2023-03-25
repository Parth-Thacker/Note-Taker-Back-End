const jwt = require("jsonwebtoken");
const user = require("../models/userModel");
const dotenv = require("dotenv")
dotenv.config()
const secretKey = process.env.SECRET_KEY;

module.exports =async (req,res,next)=>{
    const {authorization}=req.headers;
    if(!authorization){
        return res.status(422).json({
            error:"you must have login first"
        })
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,secretKey,async(err,payload)=>{
        if(err){
            return res.status(422).json({
                error:err
            })
        }

        const {_id} = payload
        const userDetails = await user.findById(_id)
        req.user = userDetails
        next()
    })
}