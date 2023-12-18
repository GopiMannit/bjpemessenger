const express = require('express');
const app = express();
const cors= require('cors');
const mongoose = require('mongoose')
const pathRoutes = require('./routes/endpoint')
app.use(cors())
require('dotenv').config();
app.use(express.json())
// Create an Elasticsearch client to communicate with elastic search engine
app.use((req, res, next) =>{
  console.log(req.path, req.method);
  next();
})
app.use('/api',pathRoutes)  
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db and listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error);
    })  