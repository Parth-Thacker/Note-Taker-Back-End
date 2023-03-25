const express = require("express")
const router = express.Router()
const Users = require("../schema/userShema")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const saltRounds = 10;
const SECRET_KEY = "KeyForUserWantsToLogIn"
router.get("/",(req,res)=>{
    res.send("ok")
})
router.post("/register",async(req,res)=>{
    const{email,password,confirmPassword} = req.body
    //console.log(req.body);
    if(!email||!password||!confirmPassword){
        return (
            res.status(422).json({
                message:"empty field"
            })
        )
    }
    else{
        try{
            const user = await Users.findOne({email:email})
        if(user){
            return (res.status(422).json({status:422,
                message:"please enter valid data"}))
        }
        else if(password !== confirmPassword){
            return (res.status(422).json({message:"please enter valid data"}))
        }
        const hash = await bcrypt.hash(password,saltRounds)
        //console.log(hash);
        const newUser = await Users.create({email,password:hash,confirmPassword:hash}) 
        res.status(201).json({
            message:"Successfully added user to db",
            data:newUser
        })
        
        }catch(e){
            console.log(e.message);
        }

    }
})

router.post('/login',async(req,res)=>{
    let token;
    try{
        let {email,password} = req.body
        if(!email||!password){
            return res.status(400).json({
                status:400,
                message:"Empty Field"
            })
        }
        else{
            const user = await Users.findOne({email:email})
            if(!user){
                return res.status(400).json({
                    status:400,
                    message:"Invalid Credentials"
                })
            }
            else{
                bcrypt.compare(password, user.password, function(err, result) {
                    // result == true

                    console.log(password=== user.password);
                    if(err){
                        return res.status(400).send({status:400,error:"Invalid credentials"})
                    }
                    token = jwt.sign({_id: user._id}, SECRET_KEY)
                        console.log(token);
                        res.status(200).json({
                        user,
                        token,
                        message:"User Logged in successfully......"})
                    

                });
                // const isMatch = bcrypt.compare(password,user.password)

                // //console.log(isMatch);
                // if(isMatch){
                //     token = jwt.sign({_id: user._id}, SECRET_KEY)
                //     console.log(token);
                // }
                // if(!isMatch){
                //     res.status(400).send({status:400,error:"Invalid credentials"})
                // }
                // else{
                //     res.status(200).json({
                //         user,
                //         token,
                //         message:"User Logged in successfully......"})
                // }
            }

        }
    }catch(e){
        res.send(e)
    }
})

module.exports=router