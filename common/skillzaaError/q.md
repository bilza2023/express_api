
- I am trying to create a centralized place for all the error messages in my node express mongoose app.
- for this I have created a custom error object SkillzaaError and placed it in an other object which just manage an array of SkillzaaError object and ensure that the name of the SkillzaaErrors added into its internal array are unique. 

SkillzaaErrors.js


class SkillzaaError extends Error {
  constructor(name, statusCode, message,description) {
  //message is the default message of the error a little more descriptive form of slug/name
    super(message);
    this.name = name;
    this.description = description; //for later for local use
    this.statusCode = statusCode;
  }
 setResonse(res){
   res.message = this.message;
    res.description = this.description; 
    res.name = this.name;
   return res.status(this.statusCode);
 
 } 
}


class SkillzaaErrors {
  #errs = [];

  addErr(name, statusCode, message,description) {
    const newErr = new SkillzaaError(name, statusCode, message,description)
    if (this.#errs.some(e => e.name === newErr.name)) {
      throw new Error('Error with this name already exists');
    }
    this.#errs.push(newErr);
  }
  getErr(name) {
  return this.#errs.find(err => err.name === name);
}
  
}

module.exports = SkillzaaErrors;


- I have created skillzaErrList an instalnce of  SkillzaaErrors
I have added all my app errors into this.
const SkillzaaErrors = require('./SkillzaaErrors');
const skillzaErrList = new SkillzaaErrors();

skillzaErrList.addErr("itemNotFound",404,"Sorry the item was not found");
skillzaErrList.addErr("unknownError",500,"Unknown error");
skillzaErrList.addErr("corruptIncommingData",400,"The incomming data is corrupted");

module.exports = skillzaErrList;

Here is a very important code piece which is where the route begins in router
the parent function.
routerTemplate.post("/new", async function(req, res) {
  try{
    debugger;
    const data = await getNewData(req,res);
    return await createNew(data.title,data.userId);  
  }catch (skillzaaError) {
    // return  skillzaaError.setResonse(res);
    console.log(skillzaaError);
  }
});

i want to send a skillzaaError from getNewData and in the catch block of the parent function it is converted into a response and returned.

Please check all the above code bits and see if there is some error in the entire system.
specially check this code
getNewData.js
//--14-6-2023 : Code review. found correct use of respOk and respFail (you have to return it these fn do not return it for you). aapConfig is used instead of .env since it is easy to pass with code.

const skillzaErrList = require('../../common/skillzaaError/skillzaaErrList');
////////////////////////////////////////////
async function getNewData (req,res) {
 try {
   const title = req.body.title;
   const userId  = req.user._id;
    return {title,userId};

  } catch (error) {
    throw new skillzaErrList.getError("corruptIncommingData");
  }
}




///////////////////////////////
module.exports  = getNewData;
