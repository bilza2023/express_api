I am creating a node.js mongodb express app using mongoose. 
In my mongodb database i have a "survey" object which has questions (an array of objects) . This "questions" array can have different types of questions. Each question type has some base common properties and other properties which are unique to each question type.
I have implemented this usiing mongoose Schema discriminator such that each question type has its own schema.

The problems in this approch :

Problem # 1 - every time the user saves the survey i have to check each question type and then cast it into its own version of schema. like this
 for (let i = 0; i < questions.length; i++) {
      const question = questions[i];

            switch (question.backendType) {
              case "SurveyMCQ":
                const q = new SurveyMCQ(question);
                await q.save();
                surveyPrep.questions.push(q);
              break;
              case "SurveyInput":
                const inpt = new SurveyInput(question);
                await inpt.save();
                surveyPrep.questions.push(inpt);
              break;
              ......
Problem # 2 : A user can create some questions and then save the survey and after that again add more questions and save it again. At this point the survey will have some old questions which have already been casted and saved in database and have their _id field from mongodb AND at the same time there are new questions added in the "questions" array of the survey which have not been stored in database before and needs to be casted in their own discriminator schema.
This presence of questions in 2 different state (one state being saved in the database for the first time where as other have been saved before in the database and has _id field etc) in one array creates a lot of confusion. 

Please discuss this problem with me so that we reach the solution of the above 2 problems.