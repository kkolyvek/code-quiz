// INTERACTIVE JAVASCRIPT FUNDAMENTALS QUIZ GAME

// This quiz has several features:
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
var form = document.querySelector("#initials-form");
// text content
var countdownText = document.querySelector("#countdown-text");
var gameTimerText = document.querySelector("#game-timer");
var questionsWrapper = document.querySelector("#questions-wrapper");
var answersContainer = document.querySelector("#answers-container");
var questionText = document.querySelector("#question-h1");

// LOCAL STORAGE VARIABLES
var score = 0;
if (!localStorage.getItem("highscoresArray")) {
    var highscores = [];
} else {
    var highscores = JSON.parse(localStorage.getItem("highscoresArray"));
};

// GAMEPLAY ASSET VARIABLES
var countdownTextArray = ["3", "2", "1", "Go!", "filler"];
var abcd = ["a", "b", "c", "d"];
var randIndex = 0; // global index for which question is being asked...
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
    },
    {
        question: "When was JavaScript first released?",
        answerCorrect: "1995",
        answersIncorrect: ["1233", "2002", "1978"]
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
    if (questionsObject.length !== 0) {
        // clear previous question from html
        while (answersContainer.firstChild) {
            answersContainer.removeChild(answersContainer.firstChild);
        };

        // build new questions in html
        randIndex = Math.floor(Math.random() * questionsObject.length);
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
        
            // write button and add to answers
            newBtn.textContent = abcd[i] + ") " + ans;
            answersContainer.appendChild(newBtn);
        };
    };
};

// start the quiz
function startGame() {
    displayWrappers("questions-wrapper");

    // reset questions and score array for next quiz
    score = 0;
    questionsObject = [
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
        },
        {
            question: "When was JavaScript first released?",
            answerCorrect: "1995",
            answersIncorrect: ["1233", "2002", "1978"]
        }
    ];

    // begin timer
    var gameTime = 60;
    gameTimerText.textContent = gameTime;
    var gameTimer = setInterval(function() {
        // display time remaining
        gameTime--;
        gameTimerText.textContent = gameTime;

        if (gameTime === 0 || questionsObject.length === 0) {
            // if time runs out or all questions are answered, stop timer and end game
            clearInterval(gameTimer);
            endGame();
        }
    }, 1000);

    //display a question
    displayQ();
};

function endGame() {
    var scoreDisplay = document.querySelector("#score-display-initials");
    scoreDisplay.textContent = `${score} Points - Good Work!`;
    displayWrappers("initials-wrapper");
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
            // once countdown ends, end timer and start the quiz
            clearInterval(countdownTimer);
            startGame();
        }
    },1000);
};

function buildLeaderboard() {
    // grab high scores (if they exist)
    if (localStorage.getItem("highscoresArray")) {
        highscores = JSON.parse(localStorage.getItem("highscoresArray"));
    };

    // input initials and scores into list
    for (var i=0; i<10; i++) {
        if (i < highscores.length) {
            document.querySelector("#scores-list").children[i].textContent = `${highscores[i][0]}: ${highscores[i][1]} points.`;
        };
    };
};

// ***************
// EVENT LISTENERS
// ***************
viewHighscoresBtn.addEventListener("click", function () {
    buildLeaderboard();
    displayWrappers("highscores-wrapper") 
});

mainMenuBtn.addEventListener("click", function() { displayWrappers("start-wrapper") });

startGameBtn.addEventListener("click", function() { countdown() });

questionsWrapper.addEventListener("click", function(event) {
    var element = event.target;
    if (element.matches(".answer-btn")) {
        if (element.getAttribute("data-answer") === "correct") {
            score++;
        };
        // remove question once it is answered
        questionsObject.splice(randIndex, 1);
        displayQ();
    };
});

form.addEventListener("submit", function(event) {
    event.preventDefault();

    var placed = false;
    if (!highscores.length) {
        highscores[0] = [document.getElementById("initials").value, score];
    } else {
        for (var i=0; i<highscores.length; i++) {
            if (highscores[i][1] < score && !placed) {
                highscores.splice(i, 0, [document.getElementById("initials").value, score]);
                placed = true;
            };
        };
        if (!placed) {
            highscores.push([document.getElementById("initials").value, score]);
        };
    };
    // clear submission box
    document.querySelector("#initials").textContent = '';
    // save scores to local variable
    localStorage.setItem("highscoresArray", JSON.stringify(highscores));
    // put together and show leaderboards
    buildLeaderboard();
    displayWrappers("highscores-wrapper");
});