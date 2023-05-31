

 
function getSurvey(user_id, incomming_title) {
   const svy = { 
        userId : user_id,
        title : incomming_title,
        saveResponse : false,
        showIntro : true,
        introText : "Welcome",
        published : false,
        showResult : true,
        showfarewellText : true,
        farewellText : "Goodbye",
        members : [],
        questions : []
   }
 return svy;   
}


module.exports = getSurvey;
