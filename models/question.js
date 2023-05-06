const mongoose = require('mongoose');

const svyOptionSchema = new mongoose.Schema({
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
  id: { //This is not mongodb _id rather the app assigned id
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    required: false,
    default : false
  },
  multiSelect: {
    type: Boolean,
    required: false,
    default : false
  },
  correctOptions: {
    type: [String],
    required: true,
    default : []
  },
  displayOptions: {
    type: String,
    enum: ["dropdown", "radio", "check" , "bars"],
    required: true,
    default : "bars"
  },
  type: {
    type: String,
    enum: ["mcq", "inputText", "inputEmail" , "inputNumber"],
    required: true,
  },
  content: {
    type: String,
    required: false
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
    type: [svyOptionSchema],
    required: true
  }
});

const Question  = mongoose.model('Question', questionSchema);

module.exports = {Question,questionSchema};

