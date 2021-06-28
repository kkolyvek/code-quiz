// INTERACTIVE JAVASCRIPT FUNDAMENTALS QUIZ GAME

// This game has several features:
// 1) timed game (60 seconds) - begins on button press
// 2) game has X amount of questions, subsequent one is shown when upon question being answered
// 3) game ends upon completion of all questions or time runs out
// 4) when game is over, user can save initials and score

// *************
// VARIABLE INIT
// *************

// LINKS TO DOCUMENT
// classes
var wrappers = document.querySelectorAll(".wrapper");
// buttons
var mainMenuBtn = document.querySelector("#mainMenu");
var viewHighscoresBtn = document.querySelector("#viewHighscores");
var startGameBtn = document.querySelector("#startGame");
// text content
var countdownText = document.querySelector("#countdown-text");
var gameTimerText = document.querySelector("#game-timer");
var questionsWrapper = document.querySelector("#questions-wrapper");
var answersContainer = document.querySelector("#answers-container");
var questionText = document.querySelector("#question-h1");

// LOCAL STORAGE VARIABLES


// GAMEPLAY ASSET VARIABLES
var countdownTextArray = ["3", "2", "1", "Go!", "filler"];
var abcd = ["a", "b", "c", "d"];
var questionsObject = [
    {
        question: "Which keyword can NOT be used to define a variable?",
        answerCorrect: "make",
        answersIncorrect: ["var", "let", "const"]
    },
    {
        question: "Which operator represents 'A is less than or equal to B'?",
        answerCorrect: "A <= B",
        answersIncorrect: ["A != B", "A === B", "A >= B"]
    },
    {
        question: "What are the primitive data types in JavaScript?",
        answerCorrect: "String, Number, and Boolean",
        answersIncorrect: ["Object, Array, and Function", "Undefined and Null", ".html, .css, and .js files"]
    }
];

// ******************
// GAMEPLAY FUNCTIONS
// ******************

// display visible elements, hide hidden ones
function displayWrappers(setVisible) {
    for (var i=0; i<wrappers.length; i++) {
        if (wrappers[i].id === setVisible) {
            wrappers[i].style.display = "flex";
        } else {
            wrappers[i].style.display = "none";
        };
    };
};

// display random question with randomized answers
function displayQ() {
    // clear previous question
    while (answersContainer.firstChild) {
        answersContainer.removeChild(answersContainer.firstChild);
    }

    // build new questions
    var randIndex = Math.floor(Math.random() * questionsObject.length);
    var q = questionsObject[randIndex];
    questionText.textContent = q.question;
    
    var correctAnsIndex = Math.floor(Math.random() * 4);
    var incorrectAnsIndex = 0;
    for (var i=0; i<4; i++) {
        // first create button
        var newBtn = document.createElement("button");
        newBtn.classList.add("answer-btn");
    
        // determine which answer to write
        if (i === correctAnsIndex) {
            var ans = q.answerCorrect;
            newBtn.setAttribute("data-answer", "correct");
        } else {
            var ans = q.answersIncorrect[incorrectAnsIndex];
            newBtn.setAttribute("data-answer", "incorrect");
            incorrectAnsIndex++;
        };
    
        newBtn.textContent = abcd[i] + ") " + ans;
        answersContainer.appendChild(newBtn);
    }

    // remove question once it's displayed
    questionsObject.splice(randIndex, 1);
};

// after countdown, display random question + answer options
function startGame() {
    // clear previous question and answers
    displayWrappers("questions-wrapper");

    // begin timer
    var gameTime = 60;
    gameTimerText.textContent = gameTime;
    var gameTimer = setInterval(function() {
        // display time remaining
        gameTime--;
        gameTimerText.textContent = gameTime;
        if (gameTime === 0) {
            clearInterval(gameTimer);
            // TO-DO time runs out case
        }
    }, 1000);

    displayQ();

    questionsWrapper.addEventListener("click", function(event) {
        var element = event.target;
        if (element.matches(".answer-btn")) {
            if (element.getAttribute("data-answer") === "correct") {
                // TODO: record correct answer
                console.log("niceone")
            } else {
                // TODO: record incorrect answer
                console.log("u fukin suk lmao")
            };
            displayQ();
        };
    });
};

// on start button press, begin 3 second count-down
function countdown() {
    displayWrappers("countdown-wrapper");

    countdownText.textContent = "Ready?"
    var timeCounter = 0;
    var countdownTimer = setInterval(function() {
        countdownText.textContent = countdownTextArray[timeCounter];
        timeCounter++;

        if (timeCounter == countdownTextArray.length) {
            clearInterval(countdownTimer);
            // once countdown ends, call game function
            startGame();
        }
    },1000);
};


// ***************
// EVENT LISTENERS
// ***************
viewHighscoresBtn.addEventListener("click", function () {
    displayWrappers("highscores-wrapper");
});
mainMenuBtn.addEventListener("click", function() { displayWrappers("start-wrapper") });
startGameBtn.addEventListener("click", function() { countdown() });

// **********
// BEGIN GAME
// **********
displayWrappers("start-wrapper");