function isPublished(publishObj) {
  let ret = {
    publishTime: null,
    unpublishTime: null,
    publishStatus: null,
    waitingTime: null,
    remainingTime: null
  };

  // Calculate the start time of the survey
  let startTime;
  if (publishObj.publishTechnique === "now") {
    startTime = new Date(publishObj.runStartTime);
    startTime = convertToPakistanTime(startTime);
  } else if (publishObj.publishTechnique === "at") {
    startTime = new Date(publishObj.publishDate);
    startTime.setHours(publishObj.hour, publishObj.min);
    startTime = convertToPakistanTime(startTime);
  }
  ret.publishTime = startTime;

  // Calculate the end time / unpublish time
  let endTime;
  if (publishObj.unpublishTechnique === "never") {
    endTime = null;
  } else if (publishObj.unpublishTechnique === "after") {
    endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + publishObj.unpublishHour);
    endTime.setMinutes(endTime.getMinutes() + publishObj.unpublishMin);
    endTime = convertToPakistanTime(endTime);
  }
  ret.unpublishTime = endTime;

  // Determine the publish status and waiting/remaining times
  let now = new Date();
  now = convertToPakistanTime(now);
  let waitingMs = new Date(startTime) - new Date(now);
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

function convertToPakistanTime(date) {
  const options = { timeZone: "Asia/Karachi" };
  return date.toLocaleString("en-US", options);
}

module.exports = isPublished;
