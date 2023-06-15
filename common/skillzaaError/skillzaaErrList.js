const SkillzaaErrors = require('./SkillzaaErrors');
const skillzaErrList = new SkillzaaErrors();

skillzaErrList.addErr("loginError",400,"You may not be logged in");
skillzaErrList.addErr("maxTemplateLimitExceeded",500,"You have exceeded the maximum limit for template creation");
skillzaErrList.addErr("failedToCreateNew",500,"Failed to create new item");

skillzaErrList.addErr("itemNotFound",404,"Sorry the item was not found");
skillzaErrList.addErr("unknownError",500,"Unknown error");
skillzaErrList.addErr("corruptIncommingData",400,"The incomming data is corrupted");

module.exports = skillzaErrList;
