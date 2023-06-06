This is a function in my node.js mongoose app.
This function is called when survey/save path is hit.
This saves/updates survey into "surveys" collection. 
There is another collection in my database called "results" which has the ._id from "surveys" collection stored in its each document as "quizId" (as foreign key).
here is the mongoose model for "results"
import SurveyResult from '../../models/result';

code==>
import SurveyResult from '../../models/result';
const prepForUpdate = require('./prepForUpdate');
const update_save_fn = require('./update_save_fn');


async function updateSimple(req, res){
    try{
    
    const incommingSurvey = await prepForUpdate(req,res);

    //##-- add code here

    //--This is the line for which we did all the stuff
    incommingSurvey.published = false;
    update_save_fn(res,incommingSurvey);
    }catch(e){
    return  res.status(500).json({ msg : "Failed to update" });
    }
}

module.exports = updateSimple;


I want you to insert some coder here
//##-- add code here
which check the results collection and if find any records where the ._id of this survey == quizId in results then return the resp.

The code will look some thing like this (example code)
const prev = await SurveyResult.count({quizId : quizId});
    if (prev > 0 ){
    return respFail(res,`You can not edit a product when it has results attached to it`,"svyWithResults");
    }