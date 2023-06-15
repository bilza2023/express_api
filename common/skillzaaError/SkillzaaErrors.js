

class SkillzaaError extends Error {
  constructor(name, statusCode, message,description) {
  //message is the default message of the error a little more descriptive form of slug/name
    super(message);
    this.name = name;
    this.description = description; //for later for local use
    this.statusCode = statusCode;
  }
 getJson(){
  return {
    message : this.message,
    description : this.description,
    name : this.name
  };
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