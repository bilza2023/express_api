

function getStudent(data){
     const cls = { 
        id : data.item.id,
        userId : data.userId,
        name : data.item.name,
        password : data.item.password,
        classId : data.item.classId
   }
 return cls;   

}

module.exports = getStudent;