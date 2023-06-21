This is a publishObj in my node.js mongodb express app.

  publishObj : {
            publishTechnique:'now' , 
            unpublishTechnique : 'never',
            hour:9, 
            min: 30, 
            unpublishHour:1,
            unpublishMin :0,
            publishDate:null
            },

I give publishObj to a function called isPublished.
function isPublished(publishObj) {
  let ret = {
    publishTime: null, // rename it to publishDate
    unpublishTime: null, //rename to unpublishDate
    publishStatus: null, 
    waitingTime: null, 
    remainingTime: null // in days , hours and minutes
  };

  // Calculate the start time of the survey
  let startTime;
  if (publishObj.publishTechnique === "now") {
    startTime = new Date(publishObj.runStartTime);
  } else if (publishObj.publishTechnique === "at") {
    startTime = new Date(publishObj.publishDate);
    startTime.setHours(publishObj.hour, publishObj.min);
  }
  ret.publishTime = startTime;

  // Calculate the end time / unpublish time
  let endTime;
  if (publishObj.unpublishTechnique === "never") {
    endTime = null;
  } else if (publishObj.unpublishTechnique === "after") {
    endTime = new Date(startTime.getTime());
    endTime.setHours(endTime.getHours() + publishObj.unpublishHour);
    endTime.setMinutes(endTime.getMinutes() + publishObj.unpublishMin);
  }
  ret.unpublishTime = endTime;

  // Determine the publish status and waiting/remaining times
  let now = new Date();
  if (now < startTime) {
    ret.publishStatus = "waiting";
    let waitingMs = startTime - now;
    let waitingHours = Math.floor(waitingMs / (1000 * 60 * 60));
    let waitingMinutes = Math.floor((waitingMs % (1000 * 60 * 60)) / (1000 * 60));
    ret.waitingTime = { hours: waitingHours, minutes: waitingMinutes };
  } else if (endTime && now > endTime) {
    ret.publishStatus = "unpublished";
  } else {
    ret.publishStatus = "published";
    ret.remainingTime = endTime ? endTime - now : null;
  }
 
  return ret;
}

module.exports = isPublished;


The purpose of this function is to create and return this object
let ret = {
    publishTime: null, // rename it to publishDate
    unpublishTime: null, //rename to unpublishDate
    publishStatus: null, 
    waitingTime: null, 
    remainingTime: null // in days , hours and minutes
  };

   publishTime =   publishObj.publishDate  BUT date in publishObj.publishDate in in UTC and publishTime  need to be in PAkistan standard Time. 

   let startTime;
  if (publishObj.publishTechnique === "now") {
    startTime = new Date(publishObj.runStartTime);
  } else if (publishObj.publishTechnique === "at") {
  ====> here the time needs to be converted into Pakistan / Karachi Time.
    startTime = new Date(publishObj.publishDate);
    startTime.setHours(publishObj.hour, publishObj.min);
  }
  ret.publishTime = startTime;

  please do that