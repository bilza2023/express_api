This is my node.js api with mongoose . 
I want to write route "/members" in which I want to obtain a subcriber.members and return that
using subscriber._id

The model of subscribers is as fol:
// Require the necessary packages
const mongoose = require('mongoose');

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
   members: {
    type: [membersSchema],
    required: false,
    default : []
  }
});


// Export the model
module.exports = mongoose.model('Subscriber', subscriberSchema);
