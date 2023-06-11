let published1 = {
  startTime: "immediate",
  startTimeType: "immediate",
  endTime: {hours:2, minutes:30},
  endTimeType: "time"
};


function isPublished(published) {
  let startTime;
  let endTime;
  let currentTime = new Date();

  if (published.startTimeType === "immediate") {
    startTime = currentTime;
  } else if (published.startTimeType === "time") {
    startTime = new Date(currentTime.getTime() + published.startTime.hours * 60 * 60 * 1000 + published.startTime.minutes * 60 * 1000);
  } else if (published.startTimeType === "dateTime") {
    startTime = new Date(published.startTime);
  }

  if (published.endTimeType === "time") {
    endTime = new Date(startTime.getTime() + published.endTime.hours * 60 * 60 * 1000 + published.endTime.minutes * 60 * 1000);
  } else if (published.endTimeType === "manual") {
    endTime = null;
  } else if (published.endTimeType === "dateTime") {
    endTime = new Date(published.endTime);
  }

  return currentTime >= startTime && (endTime === null || currentTime <= endTime);
}


let published2 = {
  startTime: "1 January, 2023, 12:00",
  startTimeType: "dateTime",
  endTime: "manual",
  endTimeType: "manual"
};
let published3 = {
  startTime: {hours:1, minutes:0},
  startTimeType: "time",
  endTime: "2 January, 2023, 12:00",
  endTimeType: "dateTime"
};

console.log(isPublished(published1)); // true or false depending on the current time
console.log(isPublished(published2)); // true or false depending on the current time
console.log(isPublished(published3)); // true or false depending on the current time
