I am new to mongodb. I want to save a quiz test in my mongodb database. Here is the structure

let data = [
{
id: 1,
question: "What is the highest mountain in the world?",
selectedAnswer: 0,
correctAnswer: 3,
explanation: "Mount Everest is the highest mountain above sea level.",
answers: [
{ id: 1, content: "K2" },
{ id: 2, content: "Kangchenjunga" },
{ id: 3, content: "Mount Everest" },
{ id: 4, content: "Lhotse" },
],
},
{
id: 2,
question: "Which is the largest desert in the world?",
selectedAnswer: 0,
correctAnswer: 4,
explanation: "The Sahara Desert is the largest hot desert in the world.",
answers: [
{ id: 1, content: "Mojave Desert" },
{ id: 2, content: "Gobi Desert" },
{ id: 3, content: "Atacama Desert" },
{ id: 4, content: "Sahara Desert" },
],
},
{
id: 3,
question: "What is the capital of Australia?",
selectedAnswer: 0,
correctAnswer: 2,
explanation: "Canberra is the capital city of Australia.",
answers: [
{ id: 1, content: "Sydney" },
{ id: 2, content: "Canberra" },
{ id: 3, content: "Melbourne" },
{ id: 4, content: "Perth" },
],
},
{
id: 4,
question: "Which is the longest river in Africa?",
selectedAnswer: 0,
correctAnswer: 1,
explanation: "The Nile is the longest river in Africa.",
answers: [
{ id: 1, content: "Nile" },
{ id: 2, content: "Congo" },
{ id: 3, content: "Niger" },
{ id: 4, content: "Zambezi" },
],
}
];


Let me explain the structure:
- Every quiz document is an array of objects (questions).
- Each question object has some data at top level:
  id: assigned by mongodb,
question: "Which is the longest river in Africa?",
selectedAnswer: 0,
correctAnswer: 1,
explanation: "The Nile is the longest river in Africa.",

- inside each question object there is another array of objects called "answers". 
- each answer is an object of the shape

{ id: 1, content: "Nile" },

i am using node.js mongoose.

Please
1 : create a mongoose scheme for this data. the schema will start as 
const mongoose = require('mongoose');

// Define the Quiz schema
const quizSchema = new mongoose.Schema({ ...

2 : Write a node.js post route "savequiz" which recieve this data and saves it in mongo db