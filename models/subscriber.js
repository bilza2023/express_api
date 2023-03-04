// Require the necessary packages
const mongoose = require('mongoose');

// Define the subscriber schema
const subscriberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});


// Export the model
module.exports = mongoose.model('Subscriber', subscriberSchema);
