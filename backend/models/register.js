const mongoose = require('mongoose');

const register_Schema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true    
    },
    mobile: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    posting: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
       
    },
    password: {
        type: String,
        required: true,
    },
    location:{
        type:String,
    },
    dateCreated: {
        type: Date,
        default: Date.now(),
      }
});

const register = mongoose.model('register', register_Schema);
module.exports = register;

