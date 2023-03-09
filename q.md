I have a node.js-express-mongodb - mongoose app

this is the data i want to save in mongodb "quizzes" table.

The Data:
- The data is an array of objects (question) 
- Each question has some data like:

  - content : string;
  - correctAnswer : number;
  - selectedAnswer: null | number
  - explanation : string
  
- Each question also has another array of objects "answers" which  contain answer objects which are like :

  - content : string

Please create a mongoose scheme for this structure 


Here is the example of one single quesition 
 {    
      content: "What is the highest mountain in the world?",    
      selectedAnswer: 0,    
      correctAnswer: 3,    
      explanation: "Mount Everest is the highest mountain above sea level.",    
      answers: [     
        { content: "K2" },     
        { content: "Kangchenjunga" },    
        { content: "Mount Everest" },     
        { content: "Lhotse" },    
      ],
    }