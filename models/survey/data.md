
# SurveySchema

 1.  <b>title</b>: type: String,required: true,// default : ""
 2.  <b>userId</b>:type: String,required: true 
 3.  <b>saveResponse</b>: type: Boolean,default : true,required: false
 3.  <b>showIntro</b>: type: Boolean,default : true,required: false
 3.  <b>introText</b>: type: String, default : "Welcome", required: false
 3.  <b>showResult</b>: type: Boolean,default : true,required: false
 3.  <b>showfarewellText</b>: type: Boolean,default : true,required: false
 3.  <b>farewellText</b>:type: String,default : "Goodbye",required: false
 3.  <b>classId</b>: type: String,default : "",required: false
 3.  <b>createdAt</b>: type: Date, default: Date.now
 3.  <b>members</b>: type: [String],required: false,default : []
 3.  <b>marks</b>:Marks per question type: Number,required: true,default : 10
 3.  <b>questions</b>: type: [svyQuestionSchema],required: false,default : []
 3.  <b>publishObj</b>: type: publishObjSchema,required: false,
 3.  <b>tags</b> :type: [String],required: false,default : []
 3.  <b>testId</b>: (SurveySchemaExtended) type: String,required: true,default: ''
