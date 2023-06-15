

  function retRes(res,err) {
    res.message = err.message;
    res.description = err.description; 
    res.name = err.name;
   return res.status(err.statusCode);
  }

  module.exports = retRes;