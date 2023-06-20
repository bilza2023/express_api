Here is my survey object saved in mongodb.
look at the "publishObj" specially
{
  "_id": {
    "$oid": "649217a667ccf3fef6246fe5"
  },
 
  "publishObj": {
    "publishTechnique": "at", //values can be "at" , "now"
    "unpublishTechnique": "after", // values can be "never" , after
    "publishDate": {
      "$date": "2023-06-22T00:00:00.000Z"
    },
    "hour": 9,
    "min": 20,
    "unpublishHour": 2,
    "unpublishMin": 10,
    "runStartTime": {
      "$date": "2023-06-20T21:18:07.489Z"
    }
}


The publishObj show us if the survey is published (available online) or not.

please write me a function called isPublished() which look at this object and decide if the survey is in which stage:

    - "waiting stage" ::  is the survey waiting for its publish time? return  "Waiting .." message and time remaining".
    - "Expired" The survey is past its unpublish time so has
     expired.
     - "Published" when survey is avaialbe.


Here are the rules for publishObj:
    - To calculate the start time of the survey. 
        if publishObj.publishTechnique == "now" the start time of the survey is  runStartTime.     
        if publishObj.publishObjpublishTechnique == "at". The start time is publishObj.publishDate for date and publishObj.hour/min for hours and minutes.

    - To calculate the end time / unpublish time
        if unpublishTechnique == "never" the survey is never unpublished and remains avaialbe all the time.
        if unpublishTechnique == "after" . it means we add the unpublishHour and unpublishMin to the start time of the survey and get the unpublish time. 
The function should return 

 ret = {
        publishTime : //date and time with hour and minutes for publish time. unpublishTime : 
        publishStatus : "waiting" , "published" , "unpublished"
 
     }

