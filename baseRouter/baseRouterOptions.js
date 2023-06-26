
class BaseRouterOptions {
    constructor(){
    this.model = null; //mongo model object
    this.data = {}; //--just to create an object

 /////////////////////////////////////////////////  
    this.data.create = {};//--just to create an object
 //{checkMaxValue : appConfig.MAX_CLASSES_ALLOWED} example backend data 
    this.data.create.backendData = {checkMaxValue : 50};
 // checksArray: PROVIDE FUNCTIONALITY BY ATTACHING FUNCTIONS
    this.data.create.checksArray = [];
 //--this is not for other methods
    this.data.create.getNewObjDataFn = {}; //function
 // getDataArray: The req will have this data or auth will provide it
    this.data.create.getDataArray = []; 


/////////////////////////////////////////////////
    this.data.update = {};
    this.data.update.backendData = {};
    this.data.update.checksArray = [];
/////////////////////////////////////////////////
    this.data.read = {};
    this.data.read.backendData = {};
    this.data.read.checksArray = [];
/////////////////////////////////////////////////
    this.data.readone = {};
    this.data.readone.backendData = {};
    this.data.readone.checksArray = [];
/////////////////////////////////////////////////
    this.data.delete = {};
    this.data.delete.backendData = {};
    this.data.delete.checksArray = [];
/////////////////////////////////////////////////

    }

}


module.exports = BaseRouterOptions;