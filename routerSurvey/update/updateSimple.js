const prepForUpdate = require('./prepForUpdate');
const update_save_fn = require('./update_save_fn');

const SurveyResult = require("../../models/result");


async function updateSimple(req, res){
    try{
    
    const incommingSurvey = await prepForUpdate(req,res);

//##-- Dont save if has results
const prev = await SurveyResult.countDocuments({ quizId: incommingSurvey._id });
if (prev > 0) {
    return res.status(400).json({ msg: "You cannot edit a survey when it has results attached to it" });
}
///////////

    //--This is the line for which we did all the stuff
    incommingSurvey.published = false;
    update_save_fn(res,incommingSurvey);
    
    }catch(e){
    return  res.status(500).json({ msg : "Failed to update" });
    }
}

module.exports = updateSimple;


