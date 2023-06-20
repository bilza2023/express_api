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