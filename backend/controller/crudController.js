// const { ConstructionOutlined } = require('@mui/icons-material');
const Feature = require('../models/register');
const summary = require('../models/summary');
const axios = require('axios');
const User = require('../models/user');
require('dotenv').config();
// const { Client } = require('@elastic/elasticsearch');
const getUser = async (req, res) => {
  const keyword = req.body.searchTerm;
  console.log(req.body);
  try {
    const searchResults = await User.find({
      $or: [
        // Case-insensitive match
        { name: { $regex: keyword, $options: 'i' } },
        { phonenumber: { $regex: keyword, $options: 'i' } },
        { posting: { $regex: keyword, $options: 'i' } },
        { district: { $regex: keyword, $options: 'i' } },
        // Add more fields as needed
      ]
    });
    res.json(searchResults);
    console.log(searchResults);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}

// const client = new Client({
//   node: process.env.ELASTIC_SERVER_URL,
//   auth: {
//     username: process.env.ELASTIC_USERNAME,
//     password: process.env.ELASTIC_PASSWORD
//   },
//   ssl: {
//     rejectUnauthorized: false
//   }
// });
// const getUser = async(req,res)=>{
//   console.log(process.env.ELASTIC_PASSWORD)
//   console.log(req.body);
//   try {
//     const { body } = await client.search({
//       index: 'bjp',
//       body: {
//         query: {
//           query_string: {
//             fields: ['*'],
//             query: `*${req.body.searchTerm}*`,
//           },
//         },
//         highlight: {
//           fields: {
//             "*": {}
//           }
//         }   
//       },
//     });
//     const hits = body.hits.hits;
//     // console.log(hits);
//     var arr=[]
//     if (hits.length > 0) {
//       arr = hits.map(hit => {
//         const fieldsObj = {};

//         Object.entries(hit._source).forEach(([field, value]) => {
//           fieldsObj[field] = value;
//         });

//         return fieldsObj;
//       });

//       console.log(arr);        
//     } 
//     res.json(arr);
//     // res.json(results);
//   } catch (error) {
//     console.error('Error searching in Elasticsearch:', error);
//     res.status(500).json({ error: 'An error occurred while searching' });
//   }
// }
const postRegister = async (req, res) => {
  const { user, mobile, email, posting, dob, password, location } = req.body
  console.log(req.body);
  try {
    const existingUser = await Feature.findOne({ user: user });
    if (existingUser) {

      res.status(204).json({ message: 'User exists' });

    }
    else {
      const feature = await Feature.create({ user, mobile, email, posting, dob, password, location })
      res.status(200).json(feature);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
const postUser = async (req, res) => {
  const { name, phonenumber, posting, district } = req.body
  console.log(req.body);
  try {
    const existingUser = await User.findOne({ name: name });
    if (existingUser) {

      res.status(204).json({ message: 'User exists' });

    }
    else {
      const feature = await User.create({ name, phonenumber, posting, district })
      res.status(200).json(feature);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
const check = async (req, res) => {

  try {
    const { username, password } = req.body;
    console.log(req.body);
    let user1 = await Feature.findOne({ user: username });
    console.log(user1);
    if (!user1) {
      return res.status(200).json({ message: 'false_user' }); // User not found
    }

    if (user1.password === password) {
      return res.status(200).json({ message: 'true' });// Authentication succes
    } else {
      return res.status(200).json({ message: 'false_password' }); // User not found
    }
  }
  catch (error) {
    res.status(400).json({ message: 'error' });
  }
}
const postSummary = async (req, res) => {
  try {
    const { user, videoid, selectedData, tag, message } = req.body;
    console.log(req.body);
    try {
      const Summary = await summary.create({ user, tag, videoid, selectedData, message });
      Summary.save;
      res.status(200).json(summary);
      console.log(true);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
}
const getSummary = async (req, res) => {
  try {
    const summaries = await summary.find(); // Retrieve all summaries from the database
    res.json(summaries);
  } catch (error) {
    res.status(500).json({ message: 'Error while fetching summaries' });
  }
};
const getProfile = async (req, res) => {
  try {
    const username = req.params.user;

    // Find the user in the database based on the username
    const user = await Feature.findOne({ user: username });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(user);
    res.status(200).json(user); // Return the user object in the response
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
}
const updateProfile = async (req, res) => {
  const updateData = req.body;
  const user = req.body.user;
  console.log(updateData);

  try {
    const updatedUser = await Feature.findOneAndUpdate({ user: user }, updateData, { new: true });
    console.log(updatedUser);
  }
  catch (error) {
    res.status(500).json({ error: 'Error updating user data' });
  }
}
const forgotpassword = async (req, res) => {
  try {
    console.log(req.body);
    const username = req.params.user;
    const updateData = req.body;
    const existingUser = await Feature.findOne({ user: username });

    if (existingUser) {

      const updatedUser = await Feature.findOneAndUpdate({ user: username }, updateData, { new: true });
      console.log(updatedUser);
      res.status(200).json({ message: 'User exists' });

    } else {
      res.status(204).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }



}
const getReport = async (req, res) => {
  try {
    const { fromdate, todate } = req.params;
    const fromDate = new Date(fromdate);
    const toDate = new Date(todate);
    console.log(fromdate);
    fromDate.setHours(0, 0, 0, 0);
    // Set time to the end of the specified day
    toDate.setHours(23, 59, 59, 999);

    console.log(fromDate);
    console.log(toDate);
    const reports = await summary.find({
      dateCreated: {
        $gte: fromDate,
        $lte: toDate
      }
    });
    res.json(reports)
  } catch (error) {
    res.status(500).json({ message: 'Error while fetching reports', error: error.message });
  }
};
const whatsApp = async (re, res) => {
  try {
    const { productId, phoneId, toNumber, type, message } = re.body;

    const req = unirest("POST", `https://api.maytapi.com/api/${productId}/${phoneId}/sendMessage`);

    req.headers({
      "x-maytapi-key": "c525ca7e-a9c4-437c-baaa-9bebda8711ac",
      "content-type": "application/json"
    });

    req.type("json");
    req.send({
      "to_number": toNumber,
      "type": type,
      "message": message
    });

    const resData = await req.execute();

    if (resData.error) {
      throw new Error(resData.error);
    }

    res.send(resData.body);
  }
  catch (error) {
    res.status(500).json({ message: 'Error while fetching reports', error: error.message });
  }
}
module.exports = {
  postRegister,
  check,
  postSummary,
  getSummary,
  getUser,
  getProfile,
  updateProfile,
  forgotpassword,
  getReport,
  whatsApp,
  postUser
}
