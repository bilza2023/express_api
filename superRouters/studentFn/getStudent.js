

function getStudent(data){
     const cls = { 
        id : data.item.id,
        userId : data.userId,
        name : data.item.name
   }
 return cls;   

}

module.exports = getStudent;