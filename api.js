require('dotenv').config();
const db = require("./mongoDb/mongo.js");

const Survey = require("./models/survey/survey.js");
const {SurveyMCQ,SurveyInput} = require("./models/survey/svyQuestion.js");
// const {ClickedLinkEvent, Event} = require("./models/event");
// const baseQuestion = require('./tests/surveyBaseQ.js')
const Svy = require('./models/survey/tests/getSurvey.js')
const baseMCQ = require('./models/survey/tests/getMCQ.js')
const baseInput = require('./models/survey/tests/getSurveyInput.js')

async function create() {
  let survey = new Survey( Svy );
  // console.log(baseInput);
  // const mcq = new SurveyMCQ(baseMCQ);
  // await mcq.save();
  // survey.questions.push(mcq);
  // survey.questions.push(mcq);
  const inpt = new SurveyInput( baseInput );
  inpt.save();
  survey.questions.push(inpt);

    const r = await survey.save();
    // console.log("survey" , survey);
    // console.log("r" ,r );
    console.log("survey saved...");
}


console.log("api test");


db.once('open',()=> {
    console.log("MongoDb ===> connection established")
    create();
});