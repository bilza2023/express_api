// Require the necessary packages
const mongoose = require('mongoose');
const {questionSchema} = require("./question");

const membersSchema = new mongoose.Schema({
  email: { //This is not mongodb _id rather the app assigned id
    type: String,
    required: true
  },
  password: {
    type: String,
    required: false,
    default : ""
  }
});

// Define the subscriber schema
const subscriberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },  
  questionsDb: {
    type: [questionSchema],
    required: false,
    default : []
  },
   members: {
    type: [membersSchema],
    required: false,
    default : []
  }
});


// Export the model
module.exports = mongoose.model('Subscriber', subscriberSchema);
