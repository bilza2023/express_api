- I am creating a Quiz Test on the topic "Solar System".
- This is for School Kids to learn about our Solar System.
- create a paragraph explanating what this quiz is about (this will be presented to the user before the quiz).
- I need 10 questions (on this topic) in a json format as given below.
- Each Question has: 
    - content: which is Statement of the Question
    - options : 3 or 4 Options one of which is correct/
    - correctOption: The id of the correct option is placed here
    - "explanation : Explanation of the question to be shown to the user after the quiz has finished to give him more information.
    - For the id ("id": "caaa7d05-1573-461e-b043-cf5018a9d460") of question  use UUID v2 
    - For the id  of options just use 01,02,03,04. 


Answer Format Example:
{
  "content": "Which is the largest river in the world by discharge volume?",
  "id": "79ac9025-47bb-48cc-ac10-3913cbede5fe",
  "correctOption": "02",
  "explanation": "",
  "options": [
    {
      "id": "01",
      "content": " Nile River"
    },
    {
      "id": "02",
      "content": "Amazon River"
    },
    {
      "id": "03",
      "content": "Yangtze River"
    },
    {
      "id": "04",
      "content": " Mississippi River"
    }
  ]
}

PLEASE PROVIDE 1 QUESTION AT A TIME IN THE SAME FORMAT. FIRST THE INTRO TEXT THEN 10 QUESTIONS ONE BY ONE.
IMPORTANT "please dont repeat question"