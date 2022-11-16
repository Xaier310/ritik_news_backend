const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();
// require('./db/config')
const User = require('./db/User')
const axios = require('axios');
require("dotenv").config();

app.use(express.json())
app.use(cors());


mongoose.connect(`${process.env.Data_Base}`, (err)=>{
    if(err) {
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


// console.log(axios);

app.get("/news/:type",async (req,res)=>{
    var type = req.params.type;
    console.log("req...."+type);
    var data = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=${type}&apiKey=7f50577e05c84ae086b154b4659aadb1&page=1&pageSize=16`)
    console.log(data.data);
    res.send(data.data);
})



const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log("Server is running")
})