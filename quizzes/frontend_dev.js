

const quiz = {
  title: "Junior Front End Developer",
  userId: "640c60780a87835ced6122af",
  saveResponse: false,
  showIntro: true,
  introText: "Answer these question to see results at the end",
  showResult: "true",
  farewellText: "Hope to see you again",
  
  questions: [
  {
  content: "Which of the following front-end frameworks is a compiler-based framework?",
  id: "238f6c18-928e-42af-8d1b-005390d2dc2f",
  correctOption: "8c828b5a-30cc-485e-8f8a-5f5c7e5d5d18",
  explanation: "Svelte is a compiler-based front-end framework, which means that it compiles your code into highly efficient vanilla JavaScript code that can run in the browser.",
  options: [
    {
      id: "8c828b5a-30cc-485e-8f8a-5f5c7e5d5d18",
      content: "Svelte"
    },
    {
      id: "5d5b01c7-6e9b-4b02-8fc8-63b84ecda05a",
      content: "React"
    },
    {
      id: "d19cfa10-f097-4c4a-b3b1-fb50e944b2b6",
      content: "Angular"
    },
    {
      id: "c4a3a1a4-2d05-4b95-a0ea-9c6320cf70c8",
      content: "Vue"
    }
  ]
},
{
  content: "What is the difference between the 'async' and 'defer' attributes when loading external scripts?",
  id: "84d5e5f5-5b26-4d5d-bf5d-998c86a2d0a7",
  correctOption: "f6c0b5e3-5b46-4b5d-bb35-0d0ba6e1c6d9",
  explanation: "The 'async' attribute tells the browser to download the script file asynchronously while the page continues to load, and to execute the script as soon as it's finished downloading. The 'defer' attribute tells the browser to download the script file asynchronously while the page continues to load, but to defer execution of the script until the page has finished parsing.",
  options: [
    {
      id: "f6c0b5e3-5b46-4b5d-bb35-0d0ba6e1c6d9",
      content: "'async' downloads and executes the script immediately after it's downloaded, while 'defer' downloads the script asynchronously but defers its execution until the page has finished parsing."
    },
    {
      id: "fb1f4e74-fab4-4ad5-a7b5-6d1b7e4c1048",
      content: "'async' downloads and executes the script only after the page has finished parsing, while 'defer' downloads the script asynchronously but executes it immediately after it's downloaded."
    },
    {
      id: "8aeb7b13-526d-4a32-ae8a-0f29d9ebbc08",
      content: "'async' downloads and executes the script immediately after it's downloaded, while 'defer' downloads the script synchronously but defers its execution until the page has finished parsing."
    },
    {
      id: "ab076c23-752a-4ef7-b38c-0de5c5a5b9d2",
      content: "'async' downloads the script file synchronously, while 'defer' downloads it asynchronously and executes it only after the page has finished parsing."
    }
  ]
},
{
  content: "What is the difference between 'GET' and 'POST' methods in HTTP?",
  id: "5c5c5bfe-8c53-47f2-95e1-21410deceac9",
  correctOption: "b3eb6af3-cc07-4e71-9713-c3a69d0e48c9",
  explanation: "The 'GET' method is used to request a resource from the server, while the 'POST' method is used to submit data to the server to create or update a resource.",
  options: [
    {
      id: "a4a4aebd-130e-4568-b9e9-bc69d77135b4",
      content: "'GET' method is used to submit data to the server, while 'POST' method is used to request a resource from the server."
    },
    {
      id: "b3eb6af3-cc07-4e71-9713-c3a69d0e48c9",
      content: "'GET' method is used to request a resource from the server, while 'POST' method is used to submit data to the server to create or update a resource."
    },
    {
      id: "eac6b3a6-6723-4e3d-ae8c-f94a408a54e1",
      content: "'GET' method is used to submit data to the server, while 'POST' method is used to delete a resource from the server."
    },
    {
      id: "ecda0f36-685f-4cd4-a8a1-dcb3cc174281",
      content: "'GET' method is used to update a resource on the server, while 'POST' method is used to create a new resource on the server."
    }
  ]
},
{
  content: "What is the difference between '==' and '===' operators in JavaScript?",
  id: "7a30d9fc-6ee4-4bca-877f-c1d4a21dd7a4",
  correctOption: "e9289c25-61e1-44c2-a15e-39cbb1e3ca77",
  explanation: "The '==' operator performs type coercion before comparison, while the '===' operator does not perform type coercion and compares the values strictly by type and value.",
  options: [
    {
      id: "cc95415d-0db8-4d62-bb99-26e33f042187",
      content: "Both '==' and '===' operators perform type coercion before comparison."
    },
    {
      id: "e9289c25-61e1-44c2-a15e-39cbb1e3ca77",
      content: "The '==' operator performs type coercion before comparison, while the '===' operator does not perform type coercion and compares the values strictly by type and value."
    },
    {
      id: "24029f3d-775a-4d23-9d4b-08275d6fb84f",
      content: "The '==' operator compares the values strictly by type and value, while the '===' operator performs type coercion before comparison."
    },
    {
      id: "12f3a3e9-7b98-4d11-a7f8-1036ee1d6f22",
      content: "Both '==' and '===' operators do not perform type coercion and compare the values strictly by type and value."
    }
  ]
},
{
  content: "What is the difference between the call() and apply() methods in JavaScript?",
  id: "7888cdd3-7103-4b6a-84ce-8c4e4b034ecc",
  correctOption: "6f8e6f5e-13c1-4cbf-a676-0e68b4dd53b4",
  explanation: "The call() method takes arguments individually, whereas the apply() method takes arguments as an array.",
  options: [
    {
      id: "61b8c945-7663-4a81-b3dd-c21f03b8d9fa",
      content: "The call() method takes arguments as an array, whereas the apply() method takes arguments individually."
    },
    {
      id: "6f8e6f5e-13c1-4cbf-a676-0e68b4dd53b4",
      content: "The call() method takes arguments individually, whereas the apply() method takes arguments as an array."
    },
    {
      id: "7f36dc95-17b7-4b4f-a4c4-6d87d6e170b6",
      content: "Both call() and apply() methods take arguments as an array."
    },
    {
      id: "d2f05cf8-8e2c-49a9-a9d7-d5461c8b3f14",
      content: "Both call() and apply() methods take arguments individually."
    }
  ]
},
{
  content: "What is the event loop in JavaScript and how does it work?",
  id: "9b6a4a4f-2258-4f2d-98b3-5805edc55e1f",
  correctOption: "6965a22e-1948-466c-92e7-c0e95dc90a24",
  explanation: "The event loop is a mechanism in JavaScript that allows for the execution of asynchronous code by managing the call stack and the message queue.",
  options: [
    {
      id: "d02ebd7d-dce5-4a7e-a755-f35d3c86028a",
      content: "The event loop is a data structure in JavaScript that stores events and triggers them when conditions are met."
    },
    {
      id: "6965a22e-1948-466c-92e7-c0e95dc90a24",
      content: "The event loop is a mechanism in JavaScript that allows for the execution of asynchronous code by managing the call stack and the message queue."
    },
    {
      id: "240e686d-9697-4ca9-9be9-c39eddc75d98",
      content: "The event loop is a JavaScript feature that enables event-based programming."
    },
    {
      id: "6cf55fc5-865f-49b2-92b2-261b68d56f97",
      content: "The event loop is a JavaScript method that can be used to delay the execution of code."
    }
  ]
},
{
  content: "What is the difference between prototypal inheritance and classical inheritance in JavaScript?",
  id: "1f95d92f-2c0b-475e-b968-767bb3161b46",
  correctOption: "0b352dc7-207d-42c3-94ee-3b8d7c0df732",
  explanation: "In classical inheritance, classes are created first and then objects are instantiated from those classes. In prototypal inheritance, objects are created first and then other objects are created from those objects.",
  options: [
    {
      id: "fa963cac-6a85-4df1-a96a-23d74e294107",
      content: "There is no difference between prototypal inheritance and classical inheritance in JavaScript."
    },
    {
      id: "0b352dc7-207d-42c3-94ee-3b8d7c0df732",
      content: "In classical inheritance, classes are created first and then objects are instantiated from those classes. In prototypal inheritance, objects are created first and then other objects are created from those objects."
    },
    {
      id: "4a6e4a6e-dc6d-46de-89f6-83f3fb3a7c8f",
      content: "In prototypal inheritance, inheritance is achieved through the use of classes and inheritance chains."
    },
    {
      id: "2bea74b7-f634-4240-a832-9d60e1f23d0c",
      content: "In classical inheritance, inheritance is achieved through the use of prototypes and prototype chains."
    }
  ]
},
{
  content: "What are some common performance optimization techniques for front-end web development?",
  id: "c6f4da4d-4f2f-4e70-8b7f-08f1aaec59f3",
  correctOption: "3a9c2160-7e70-4c0e-a42f-bbce43900d52",
  explanation: "Some common performance optimization techniques for front-end web development include minimizing HTTP requests, minifying and compressing code, caching resources, and lazy loading images and other assets.",
  options: [
    {
      id: "7c655222-f1a7-41e5-8a16-8e157bb84006",
      content: "Increasing the number of HTTP requests to improve parallelism."
    },
    {
      id: "35299b75-84cb-41e5-9a13-3a5426bebcdd",
      content: "Including large images and other assets directly in the HTML document."
    },
    {
      id: "f3c82d3e-9305-4e96-8ad2-8bf4a67a0134",
      content: "Using synchronous AJAX requests to load data."
    },
    {
      id: "3a9c2160-7e70-4c0e-a42f-bbce43900d52",
      content: "Minimizing HTTP requests, minifying and compressing code, caching resources, and lazy loading images and other assets."
    }
  ]
},
{
  content: "How would you implement server-side rendering (SSR) for a Svelte application, and what are some benefits and drawbacks of this approach?",
  id: "a327be1f-d88d-4d39-9f07-0c61b8b72995",
  correctOption: "a11a1de9-1295-46ed-bd0b-920f83ce8b17",
  explanation: "To implement server-side rendering for a Svelte application, you can use the SvelteKit framework, which provides built-in SSR capabilities. Some benefits of SSR include improved initial load times, better search engine optimization (SEO), and improved accessibility. Some drawbacks include increased complexity, potentially slower subsequent page loads due to the extra server processing required, and potential issues with maintaining client-side state.",
  options: [
    {
      id: "a11a1de9-1295-46ed-bd0b-920f83ce8b17",
      content: "Use the SvelteKit framework for built-in SSR capabilities. Benefits include improved initial load times, better SEO, and improved accessibility. Drawbacks include increased complexity and potentially slower subsequent page loads due to the extra server processing required.",
    },
    {
      id: "7e23fde6-5487-4bde-a784-0f90603d103f",
      content: "Use a library like Express.js to implement server-side rendering. Benefits include improved initial load times and better SEO. Drawbacks include increased complexity and potential issues with maintaining client-side state.",
    },
    {
      id: "1af3b2c3-1a5d-4d0e-9e6a-9ab7a23d2340",
      content: "Server-side rendering is not recommended for Svelte applications. Instead, focus on optimizing the client-side performance with techniques like code splitting and lazy loading.",
    },
    {
      id: "d239be84-d9f1-4c8b-a7f6-4d60b049ee6c",
      content: "Use a serverless architecture with a service like AWS Lambda to implement server-side rendering. Benefits include improved scalability and reduced infrastructure costs. Drawbacks include increased complexity and potential issues with maintaining client-side state.",
    }
  ],
},
{
  content: "What is the difference between virtual DOM and real DOM?",
  id: "64c58c23-2d79-45c9-9a85-d346c13df1e1",
  correctOption: "bb8b0d88-2f2d-4829-bf31-2d301b6aae0a",
  explanation: "The virtual DOM is a JavaScript representation of the real DOM. Instead of updating the entire DOM tree, changes are first made to the virtual DOM and then only the necessary updates are made to the real DOM, which is more efficient.",
  options: [
    {
      id: "bb8b0d88-2f2d-4829-bf31-2d301b6aae0a",
      content: "Virtual DOM is a JavaScript representation of the real DOM, making updates more efficient."
    },
    {
      id: "07a4a0a7-940d-4e80-b8bb-131d16e0c1a4",
      content: "Real DOM is a JavaScript representation of the virtual DOM, making updates more efficient."
    },
    {
      id: "40d674a5-5c5e-42cb-a5f6-67cb6dd800a6",
      content: "There is no difference between virtual DOM and real DOM."
    },
    {
      id: "3158786f-9c8f-41ee-9c15-194b15418f0a",
      content: "Virtual DOM is used for server-side rendering, while real DOM is used for client-side rendering."
    }
  ]
}


], // ---questions end
} //--quiz end

module.exports = quiz;