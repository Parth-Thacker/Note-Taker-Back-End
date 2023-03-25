const express = require("express");
const requirelogin = require("../middlewares/requirelogin");
const router = express.Router();
const Notes = require("../models/noteSchema")
router.post("/create-note",requirelogin, async (req,res)=>{
    try{
       
        const data = await Notes.create(req.body)
        res.status(200).json({
            message:"posted successully",
            data
        })
    }
    catch{
        res.status(500).json({
            error:"server error",
            
        })
    }
    
})
router.get("/notes",requirelogin, async (req,res)=>{
    try{
        const data = await Notes.find()
        res.status(200).json({
            message:"successully",
            data
        })
    }
    catch{
        res.status(500).json({
            error:"server error",
            
        })
    }
    
})
router.get('/note/:id', async (req,res)=>{
    try{
        const data = await Notes.findById({_id: req.params.id});
        return res.status(200).json({
            status: "success",            
            data,        
    })
    }
    catch(e){
        return res.status(422).json({    
            status: "failure",        
            error: e.error
        })
    }
})
router.put("/update/:id", async (req,res)=>{
    try{
        const data = await Notes.findByIdAndUpdate({_id:req.params.id},req.body)
        const updatedData = await Notes.findOne({_id:req.params.id})
        res.status(200).json({
            message:"updated successully",
            updatedData
        })
    }
    catch{
        res.status(500).json({
            error:"server error",
            
        })
    }
    
})
router.delete("/delete/:id", async (req,res)=>{
    try{
        const data = await Notes.findByIdAndDelete({_id:req.params.id})
        res.status(200).json({
            message:"deleted successully",
        })
    }
    catch{
        res.status(500).json({
            error:"server error",
            
        })
    }
    
})
router.delete("/deleteAll",requirelogin, async (req,res)=>{
    try{
        const data = await Notes.deleteMany()
        res.status(200).json({
            message:"deleted successully",
        })
    }
    catch{
        res.status(500).json({
            error:"server error",
            
        })
    }
    
})
module.exports= router