//I call all the id elements here 
const quizContainer = document.getElementById('quiz');
const questionElement = document.getElementById('question');
const choiceElements = document.querySelectorAll('#choices li span');
const submitButton = document.getElementById('submitBtn');
const resultContainer = document.getElementById('result');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
// This is the array of questions
const quiz = [
  {
    question: 'Java is...',
    choices: ['Strutured programming language', 'Object-Oriented Programming Language', 'Linear Programming Language', 'Not object oriented programming language'], 
    correctAnswer: 'B'
  },
  {
    question: 'java current version?',
    choices: ['Java12', 'Java11','Java20', 'Java21'],
    correctAnswer: 'C'
  },
  {
    question: 'What does HTML stand for?',
    choices: ['Hyper Text Markup Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'],
    correctAnswer: 'A'
  }
];
// this is the current question
let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timerId;
// This function starts the quiz and shows the question and time left
function startQuiz() {
  showQuestion();
  startTimer();
}
// This function shows the question
function showQuestion() {
  const question = quiz[currentQuestion];
  questionElement.textContent = question.question;
// This is the array of choices
  for (let i = 0; i < choiceElements.length; i++) {
    choiceElements[i].textContent = question.choices[i];
  }
}
// This function checks the answer
function checkAnswer() {
  const selectedOption = document.querySelector('input[name="choice"]:checked');
  // If there is no selected option
  if (!selectedOption) {
    return;
  }
  
  const answer = selectedOption.value;
  // If the answer is correct
  if (answer === quiz[currentQuestion].correctAnswer) {
    // Increase the score
    score++;
  }
  // Advance to the next question
  currentQuestion++;
  // Show the next question
  if (currentQuestion === quiz.length) {
    // Show the result
    endQuiz();
  } else {
    // Show the question
    showQuestion();
  }
}
// This function starts the timer
function startTimer() {
  timerId = setInterval(updateTimer, 1000);
}
// This function updates the timer
function updateTimer() {
  // Reduce the time
  timeLeft--;
  // Update the timer
  if (timeLeft < 0) {
    // Stop the timer
    clearInterval(timerId);
    // Show the result
    endQuiz();
  } else {
    // Update the timer
    timeElement.textContent = timeLeft;
  }
}
// This function ends the quiz and shows the result after the quiz
function endQuiz() {
  clearInterval(timerId);
  quizContainer.classList.add('hidden');
  resultContainer.classList.remove('hidden');
  scoreElement.textContent = `Your score: ${score} / ${quiz.length}`;
}
// This function starts the quiz
submitButton.addEventListener('click', checkAnswer);
startQuiz();