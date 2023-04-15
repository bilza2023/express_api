const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  id: { //This is not mongodb _id rather the app assigned id
    type: String,
    required: true
  },
  content: {
    type: String,
    required: false
  }
});
 
const questionSchema = new mongoose.Schema({
  content: {
    type: String,
    required: false
  },
  id: { //This is not mongodb _id rather the app assigned id
    type: String,
    required: true
  },
  correctOption: {
    type: String,
    required: false
  },
  explanation: {
    type: String,
    required: false
  },
  options: {
    type: [optionSchema],
    required: true
  }
});

const Question  = mongoose.model('Question', questionSchema);

module.exports = {Question,questionSchema};

