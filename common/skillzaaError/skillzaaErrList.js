const SkillzaaErrors = require('./SkillzaaErrors');
const skillzaErrList = new SkillzaaErrors();

skillzaErrList.addErr("itemNotFound",404,"Sorry the item was not found");
skillzaErrList.addErr("unknownError",500,"Unknown error");
skillzaErrList.addErr("corruptIncommingData",400,"The incomming data is corrupted");

module.exports = skillzaErrList;
