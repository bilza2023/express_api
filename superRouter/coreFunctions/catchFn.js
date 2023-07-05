
//--2023-6-26
//This is one line but it is very important
//--Every final error comes here..
//--return is must
function catchFn(err,res){
 if (err.type == 'skillzaaError'){
    return res.status(400).json({message: err.message});
        }else {
    return res.status(500).json({message: 'operation failed'});
        }

}
module.exports = catchFn;