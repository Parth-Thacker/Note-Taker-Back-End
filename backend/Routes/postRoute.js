const express = require("express")
const router = express.Router()
const Notes = require("../schema/NoteSchema")

router.get("/getnote",async (req,res)=>{
    const {search=""}=req.query
    let notes;
    try{
        if(search==""){
            notes = await Notes.find()
            res.json({
                status:"ok",
                data :notes
            })
        }
        else{
            notes = await Notes.find({topic:search})
            return res.json({
                status:"ok",
                data:notes
            })
        }
        
        
    }
    catch(e){
        res.json({
            status:"error",
            massage:e.massage
        })
    }
})
router.post("/addnote",async (req,res)=>{
    const{title,description}=req.body
    console.log(req.body);
    try{
        if(!title||!description){
            return (
                res.status(422).json({
                    message:"empty field"
                })
            )
        }
        else{
            const post = await Notes.create({
                date: new Date(),
                title:title,
                description:description })
                res.json({
                    data:post,
                    message:"Note Added Successfully"
                })
        }
    }catch(e){
        res.status(400).send({message:e.message})
        console.log(e.message);
    }

})

router.patch("/addnote/:id",async (req,res)=>{
    const id = req.params.id
   try{
    const {title,description} = req.body
    if(!title||!description){
        return (
            res.status(422).json({
                message:"empty field"
            })
        )
    }
    const post = await Notes.updateOne({_id:id},req.body)
    res.json({
        status:"ok",
        post
    })
   }catch(e){
    res.json({
        status: "Failed",
        message: e.message
    })
   }
})

router.delete("delete/:id",async (req,res)=>{   
    const id = req.params.id
    try{
        const data = await Notes.deleteOne({_id:id})
        const notes = await Notes.find()
        res.json({
            status:"Ok",
            data,
            notes
        })
    }catch(e){
        res.json({
            status:"failed",
            massage:e.massage
        })
    }
})

module.exports=router