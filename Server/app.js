const express = require("express");
const app = express()
const getConn = require("./connection/conn")
const port = 5000 || process.env.port
const signup = require("./Routes/signup")
const signIn = require("./Routes/signIn")
const notes = require("./Routes/notes")
const cors = require("cors")
getConn()
app.use(cors())
app.use(express.json())
app.use(signup)
app.use(signIn)
app.use(notes)

app.listen(port,()=>console.log("server is running"))