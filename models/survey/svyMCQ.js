const mongoose = require('mongoose');


const optionSchema = new mongoose.Schema({
  id: {  
    type: String,
    required: true
  },
  content: {
    type: String,
    required: false
  }
});
 
const svyMCQSchema = new mongoose.Schema({

  multiSelect: {
    type: Boolean,
    required: false,
    default : false
  },
  selectedOptions: {
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
  options: {
    type: [optionSchema],
    required: true
  }
});

const SvyMCQ  = mongoose.model('SvyMCQ', svyMCQSchema);

module.exports = {svyMCQSchema};

