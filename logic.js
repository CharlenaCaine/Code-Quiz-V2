var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");

var timerEId = document.getElementById("time");
var time = questions.length * 10;
var timerId;

function startQuiz() {
 
  var startScreen = document.getElementById("start-screen");
  startScreen.setAttribute("class", "start hide");

  
  questionsEId.setAttribute("class", " ");
 
  timerId = setInterval(function(){
    clockTick();
  }, 1000);

  timerEId.textContent = time;

  getQuestion();
}

var currentQuestionIndex = 0;
var questionsEId = document.getElementById("questions");
var choicesEId = document.getElementById("choices");

function getQuestion() {
  
  var currentQuestion = questions[currentQuestionIndex];

  questionsEId.children[0].textContent = currentQuestion.title;

  while (choicesEId
  .hasChildNodes()) {
    choicesEId
  .removeChild(choicesEId
    .lastChild);
  }

  for(var i = 0; i < currentQuestion.choices.length; i++){

   
    var choiceButton = document.createElement("button");
    choiceButton.textContent = currentQuestion.choices[i];
    
  
    choicesEId
  .appendChild(choiceButton);
  }
  
  choicesEId
.children[0].addEventListener("click", function(event){
    questionClick(choicesEId
    .children[0]);
  });
  choicesEId
.children[1].addEventListener("click", function(event){
    questionClick(choicesEId
    .children[1]);
  });
  choicesEId
.children[2].addEventListener("click", function(event){
    questionClick(choicesEId
    .children[2]);
  });
  choicesEId
.children[3].addEventListener("click", function(event){
    questionClick(choicesEId
    .children[3]);
  });
}

var feedbackEId = document.getElementById("feedback");

function questionClick(answerChoice) {
 
  if(answerChoice.textContent != questions[currentQuestionIndex].answer){
   
    time -= 10;
   
    feedbackEId.textContent = "Incorrect";
   
    sfxWrong.play();
  }
 
  else{
 
    feedbackEId.textContent = "Correct";
    sfxRight.play();
  }


  feedbackEId.setAttribute("class", "feedback");
  setInterval(function(){
    feedbackEId.setAttribute("class", "feedback hide");
  }, 1000);

  
  currentQuestionIndex++;

  
  if(currentQuestionIndex === questions.length)
   
    quizEnd();

  else
   
    getQuestion();
}

function quizEnd() {

  clearInterval(timerId);
  timerEId.textContent = time;

  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.setAttribute("class", " ");


  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;


  questionsEId.setAttribute("class", "hide");
}

function clockTick() {
 
  time--;
  timerEId.textContent = time;

 
  if(time <= 0)
    quizEnd();
  
}

var nameEId = document.getElementById("name");
function saveHighscore() {
  
  var name = nameEId.value.toUpperCase();
 
  if(name === ""){ 
    alert("Input mustn't be blank'");
    return;
  }
  else if(name.length > 5){
    alert("Input must be no more than 20 characters");
    return;
  }
  else{
   
    var highscores;
    if(JSON.parse(localStorage.getItem("highscores")) != null)
      highscores = JSON.parse(window.localStorage.getItem("highscores"));
    else
      highscores = [];
   
    var newScore = {
      name: name,
      score: time
    };
    highscores.push(newScore);
   
    localStorage.setItem("highscores", JSON.stringify(highscores));
   
    location.href = "highscores.html";
  }
}

function checkForEnter(event) {

    if(event.keyCode === 13)
      saveHighscore();
}

var submitBtnEId = document.getElementById("submit");
submitBtnEId.onclick = saveHighscore;

var startBtnEId = document.getElementById("start");
startBtnEId.onclick = startQuiz;

nameEId.onkeyup = checkForEnter;
