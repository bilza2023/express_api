function isPublished(publishObj) {
  let ret = {
    publishTime: null,
    unpublishTime: null,
    publishStatus: null,
    waitingTime: null,
    remainingTime: null
  };
// debugger;
  // Calculate the start time of the survey
  let startTime;
  if (publishObj.publishTechnique === "now") {
    startTime = new Date(publishObj.runStartTime);
    startTime = convertToPST(startTime);

  } else if (publishObj.publishTechnique === "at") {
    startTime = new Date(publishObj.publishDate);
//--not required since i has been done at front end
    // startTime.setUTCHours(publishObj.hour, publishObj.min);
    startTime = convertToPST(startTime);
  }
  ret.publishTime = startTime;

  // Calculate the end time / unpublish time
  let endTime;
  if (publishObj.unpublishTechnique === "never") {
    endTime = null;
  } else if (publishObj.unpublishTechnique === "after") {
    endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() + publishObj.unpublishHour);
    endTime.setMinutes(startTime.getMinutes() + publishObj.unpublishMin);
    //not req already there 
    // endTime = convertToUTC(endTime);
  }
  ret.unpublishTime = endTime;

  // Determine the publish status and waiting/remaining times
  let now = new Date();
  now = convertToPST(now); // important

  let waitingMs = startTime - now;
  if (now < startTime) {
    ret.publishStatus = "waiting";
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
function convertToPST(dateString) {
  const options = { timeZone: 'Asia/Karachi' };
  const dateObj = new Date(dateString);

  return new Date(dateObj.toLocaleString('en-US', options));
}

module.exports = isPublished;
