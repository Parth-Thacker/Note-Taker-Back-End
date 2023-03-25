const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String, required:true}
},{timestamps:true})

const noteModel = mongoose.model('NOTEAPP', noteSchema);

module.exports = noteModel;