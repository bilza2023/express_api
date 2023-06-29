
//--2023-6-26
//This is one line but it is very important
//--Every final error comes here..
//--return is must
function catchFn(error,res){
//keep this erros sending on off switch here and not out side.
const debugMode = true;
  if (debugMode){
      return res.status(500).json({message:error.message || 
        'error message not found'});
  }else { 
      return res.status(500).json({message: 'operation failed'});
  }
}
module.exports = catchFn;