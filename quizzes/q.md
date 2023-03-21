I am creating a quiz object in javascript which has questions and each question has few options (mostly 3 or 4). One out of these options is the correct answer.
REQUIREMENT:
Create me 5 question for this quiz about 
Junior Front End Web Developer (to guage the expertise of a junior front end web developer). 

The structure of each question is :
 {
      content: "Main content of the question?",
      id: "6a1ca9f9-f592-4a20-bdc9-0b2e1c90e58a",
      correctOption : "bc32734b-2d87-47cd-98f1-8d0a4786fb08",
      explanation: "explanation of the question ",
      options: [
        {
          id: "bc32734b-2d87-47cd-98f1-8d0a4786fb08",
          content: "correct"
        },
        {
          id: "38781586-0799-4428-8894-4abb074ea48d",
          content: "option--2" 
        },
        {
          id: "33b0e2f5-e4ba-43f2-9e98-99eed20e0a72",
          content: "option--3"
        },
        {
          id: "02df4333-0af5-447c-8ea1-ac39dad4300f",
          content: "option--4",
          
        }
      ],
    },

content = the statememt of the question.
you should create ids using uuidv4 for the question and the options.
The id of the correct option should be placed in "correctOption".

- Please give one question at a time.