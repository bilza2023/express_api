const MathQuestion = require('../models/mathQuestion');
const ex_data = require("./ex4_4.js");

//===> must change chapter and exerice 
const exerciseData = {
board: 'FBISE',
class: 9,
chapter: 4,
exercise: '4.4',
finalized: false,
free: true,
eqs: []
}
// questionNo , part filename
module.exports = async function faker() {
  try {

        for (let i = 0; i < ex_data.length; i++) {
          const numberOfParts = ex_data[i];
          exerciseData.questionNo = i+1;
            
            for (let j = 0; j < numberOfParts; j++) {

              exerciseData.part = j+1;

exerciseData.filename =  `${exerciseData.board.toLowerCase()}_cl_${exerciseData.class}_ch_${exerciseData.chapter}_ex_${exerciseData.exercise}_q_${exerciseData.questionNo}_pt_${exerciseData.part}`;
;

      await MathQuestion.create(exerciseData);
    console.log(`${exerciseData.filename} inserted successfully.`);              
      }//j
          
}//i
        // Insert the custom data into the database
     
    // }
  } catch (error) {
    console.error('Error inserting MathQuestion records:', error);
  }
};
