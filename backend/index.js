const express = require("express")
const app = express()
const userRoute = require("./Routes/userRoute")
const notesRoute = require("./Routes/postRoute")
const mongoose = require("mongoose")
const DB = "mongodb+srv://parth:parth1213@cluster0.74cqu65.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(DB).then(()=>{console.log("Connected");}).catch((err)=>{console.log("err");})
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
const cors = require("cors")
app.use(cors())
app.use("/user",userRoute)
app.use("/note",notesRoute)
app.get("/",(req,res)=>{
    res.send("ok")
})

app.listen(8080,console.log("app is running on port 8080"))