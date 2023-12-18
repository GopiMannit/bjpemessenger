const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const summary_Schema= new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    videoid:{
      type:String,
      required:true,
    },
    message:{
      type:String, 
    }, 
    tag:{
      type:String,
    },
    dateCreated: {
      type: Date,
      default: Date.now(),
    },
   selectedData: [
    [
      {
        type: String,
        required: true
      },
      {
        type: String,
        required: true
      }
    ]
  ]

});

const summary= mongoose.model('summary', summary_Schema);
module.exports = summary;
