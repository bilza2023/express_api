
const prepForUpdate = require('./prepForUpdate');
const update_save_fn = require('./update_save_fn');


async function updatePublish(req, res){
    try{
    const incommingSurvey = await prepForUpdate(req,res);
    //--This is the line for which we did all the stuff
    incommingSurvey.published = true; //true
    update_save_fn(res,incommingSurvey);
    }catch(e){
    return  res.status(500).json({ msg : "Failed to update" });
    }
}

module.exports = updatePublish;


