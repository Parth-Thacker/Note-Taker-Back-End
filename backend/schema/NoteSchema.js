const mongoose = require("mongoose")

const schema = mongoose.Schema

const NoteSchema = new schema({
    title:{type:String,require:true},
    description:{type:String,require:true},
    date:{type:String}
})

const NoteModel = mongoose.model("Notes",NoteSchema)

module.exports=NoteModel