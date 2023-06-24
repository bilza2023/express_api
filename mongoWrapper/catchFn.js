const {SkillzaaError} = require('./skillzaaError/SkillzaaErrors');


function catchFn(error,res){
  if (error && error instanceof SkillzaaError && error.type === 'skillzaaError') {
      return res
        .status(error.statusCode || 500)
        .json(error.getJson());
    } else {
       return res
        .status( 500).json({message : 'Unknown Error',error});
    }

}
module.exports = catchFn;