const { default: mongoose } = require('mongoose');
require('./config');

const userSchema = new mongoose.Schema({
    Full_name : String,
    email : String,
    password : String
}) 

module.exports = mongoose.model("users",userSchema)