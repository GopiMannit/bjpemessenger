const mongoose = require('mongoose');
const user= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String,
        required:true 
    },
    posting:{
        type:String,
        required:true 

    },
    district:{
        type:String,
        required:true 
    }, 
    dateCreated: {
        type: Date,
        default: Date.now(),
      }
});

const members= mongoose.model('User', user);
module.exports = members;

