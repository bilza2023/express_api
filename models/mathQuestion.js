const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spSchema = new Schema({
  code: { // Code string
    type: String,
    required: true,
  },
  type: { // Type of content, can be 'html', 'text', or 'code'
    type: String,
    enum: ['html', 'text', 'code' , 'image','img','table','tbl'],
    required: true
  }
});

///////////////////////
const eqSchema = new Schema({
  step: { // Step number
    type: Number,
    required: true
  },
  code: { // Code string
    type: String,
    required: true
  },
  time: { // Time number
    type: Number,
    required: false,
    default :0
  },
  type: { // Type of content, can be 'text' or 'code'
    type: String,
    enum: ['text', 'code'],
    required: true,
    default: 'code'
  },
  sp:{
	type:[spSchema] ,
	required:true ,
	default :[]
	} 
});

///////////////////////////////////////////
const MathSchema = new Schema({
  board: { // Board name, can be one of the specified values
    type: String,
    enum: ['Punjab', 'Pakhtoonkhwa', 'Sind', 'Balochistan', 'FBISE'],
    required: true
  },
  class: { // Class number
    type: Number,
    required:true,
	  default :9 
  },
  chapter:{ // Chapter number 
	type:Number ,
	required:true , 
	},
	exercise:{// Exercise string 
	type:String ,
	required:true ,
	},

	questionNo:{// Question number 
	type:Number ,
	required:true ,
	},
	part:{// Part string 
	type:String ,
	required:true ,
	},
	finalized:{// Part string 
	  type: Boolean ,
	  required:true ,
    defaul : false
	},
	free:{// Part string 
	  type: Boolean ,
	  required:true ,
    defaul : true //change it to false later
	},
	filename: {
    type: String,
    required: true,
    unique: true
    },
	eqs:{
	type:[eqSchema] ,
	required:true ,
	default :[]
  } 
  
});

const MathQuestion = mongoose.model('Math', MathSchema);
module.exports = MathQuestion;