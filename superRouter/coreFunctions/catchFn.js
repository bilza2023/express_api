
//--2023-6-26
//This is one line but it is very important
//--Every final error comes here..
//--return is must
function catchFn(error,res){
 if (e.type == 'skillzaaError'){
    return res.status(200).json({message: e.message});
        }else {
    return res.status(500).json({message: 'operation failed'});
        }

}
module.exports = catchFn;