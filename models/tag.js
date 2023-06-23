const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  userId: {
    type: String,
    required: true
  }
});

const Tag = mongoose.model('Tag', tagSchema);
module.exports = {Tag,tagSchema};