const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();
// require('./db/config')
const User = require('./db/User')
require("dotenv").config();

app.use(express.json())
app.use(cors());

// console.log(process.env.DataBase)

mongoose.connect(`${process.env.Data_Base}`, (err)=>{
    if(err) {
        // console.log(err)
        throw err

    }else{
        console.log("Database successfully connected")
    }
})

app.get("/",(req,res)=>{
    res.send("Working")
})

app.post("/signup", async (req,res)=>{

    if(req.body.email && req.body.password){
        const result = await User.findOne({email : req.body.email})
        if(result){
            res.send({result:"User already exist"})
        }else{
            const user = new User(req.body)
            const data = await user.save();
            res.send(data);
        }
    }else{
        res.send({result:"Please enter data"})
    }
})

app.post("/login", async (req, res)=>{
    if(req.body.email && req.body.password){
        const result = await User.findOne(req.body)
        if(result){
            res.send(result)
        }else{
            res.send({result:"User not found"})
        }
    }else{
        res.send({result:"Please enter data"})
    }
})

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log("Server is running")
})