const mongoose = require('mongoose');
const {tagSchema} = require("../models/tag");


const Schema = mongoose.Schema;

const studentSchema = new Schema({
  id: { //registeration number
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: false
  },
  email: { 
    type: String,
    required: false
  },
  password: {
    type: String,
    required: false,
    default : ""
  },
  description: {
    type: String,
    required: false
  },
  tags : { 
      type: [tagSchema],
    required: false,
    default : []
  },
  userId: {
    type: String,
    required: true
  }
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;