const questions= [
    { 
        question : "What does HTML stand for?",
        answers:[
            {text: "Hyper Text Markup Language", correct: true},
            {text: "High Text Machine Language", correct: false},
            {text: "Hyperlink and Text Markup Language", correct: false},
            {text: "Home Tool Markup Language", correct: false},
        ]
    },
    {
        question : "Which tag is used to create a hyperlink in HTML?",
        answers:[
            {text: "link", correct: false},
            {text: "a", correct: true},
            {text: "href", correct: false},
            {text: "nav", correct: false},
        ]   
    },
    {
        question : "Which attribute is used to open a link in a new tab?",
        answers:[
            {text: 'open="_blank"', correct: false},
            {text: 'target="new"', correct: false},
            {text: 'target="_blank"', correct: true},
            {text: 'window="_new"', correct: false},
        ]  

    },
    {
        question : "Which property is used to change text color in CSS?",
        answers:[
            {text: "background-color", correct: false},
            {text: "font-color", correct: false},
            {text: "color", correct: true},
            {text: "text-color", correct: false},
        ]  
    },
    {
        question : "Which CSS selector is used to select all elements?",
        answers:[
            {text: "*", correct: true},
            {text: "#", correct: false},
            {text: ".", correct: false},
            {text: "all", correct: false},
        ]  
    },{
        question : "Which CSS property is used for making text bold?",
        answers:[
            {text: "font-weight", correct: false},
            {text: "text-style", correct: false},
            {text: "bold", correct: false},
            {text: "text-weight", correct: true},
        ]  
    },{
        question : "Which keyword is used to declare a variable in JavaScript?",
        answers:[
            {text: "var", correct: true},
            {text: "int", correct: false},
            {text: "string", correct: false},
            {text: "declare", correct: false},
        ]  
    },{
        question : "What is the correct syntax for a function in JavaScript?",
        answers:[
            {text: "function myFunction() {}", correct: true},
            {text: "func myFunction() {}", correct: false},
            {text: "def myFunction() {}", correct: false},
            {text: "create function myFunction() {}", correct: false},
        ]  
    },{
        question : 'How do you write "Hello World" in an alert box?',
        answers:[
            {text: 'alertBox("Hello World");', correct: false},
            {text: ' msg("Hello World");', correct: false},
            {text: 'alert("Hello World");', correct: true},
            {text: 'display("Hello World");', correct: false},
        ]  
    },{
        question : "What happens when you use JavaScript to change the innerHTML of an element with a specific class and also modify its CSS color property?",
        answers:[
            {text: " The text content updates, but the style remains unchanged.", correct: false},
            {text: "The text content and color both change as expected.", correct: true},
            {text: "The JavaScript code will throw an error because CSS cannot be modified this way.", correct: false},
            {text: "Only the first change (either text or color) will apply, not both.", correct: false},
        ]  
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;


function startQuiz(){
    currentQuestionIndex= 0;
    score= 0;
    nextButton.innerHTML = "Next";
    showQestion();
}

function showQestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML= questionNo + " ."+ currentQuestion.question;


    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);    
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer) ;         

    });
}
function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;

    const iscorrect = selectedBtn.dataset.correct==="true";
    if(iscorrect){
        selectedBtn.classList.add("correct");
        score++;
    } 
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct")
        }
        button.disabled = true;
    });
    nextButton.style.display="block";
}
function showScore(){
    resetState ();
    questionElement.innerHTML = `your score ${score} out of ${questions.length}!`;
    nextButton.innerHTML="play Again";
    nextButton.style.display = "block";
}

function handlenextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex <questions.length){

        showQestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handlenextButton();
    }else{
        startQuiz();
    }
});

startQuiz();