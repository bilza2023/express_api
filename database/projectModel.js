

const getProject =  (db,DataTypes) =>{
const Project = db.define('projects', 
{
  id : {
    type : DataTypes.INTEGER,
    autoIncrement : true,
    allowNull : false,
    primaryKey : true,

    },
  name : {
    type : DataTypes.STRING,
    allowNull : false,
    },
  data : {
    type : DataTypes.JSON,
    allowNull : true, // change this to false
    }


});
 
return Project;
}
//------------------------------
module.exports = getProject;