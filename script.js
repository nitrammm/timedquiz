const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')
const startBtn = document.getElementById('btn')
const finalScoreEl = document.getElementById('finalscore')
const gameoverEl = document.getElementById('gameover')
const startQuiz = document.getElementById('start_page')
const highscoreContainer = document.getElementById('highscorecontainer')
const highscoreDiv = document.getElementById('highscorepage')
const highscoreInputName = document.getElementById('initials')
const highscoreDisplayName = document.getElementById('highscoreinitials')
const submitScoreBtn = document.getElementById('submitscore')
const highscoreDisplayScore = document.getElementById('highscorescore')
const timer = document.getElementById('time')

//quiz information

var quizData = [
    {
        question: 'How many seasons are in a year?',
        a: 'three',
        b: 'two',
        c: 'four',
        d: 'six',
        correct: 'c',
    },

    {
        question: 'How many days are in a year?',
        a: '250 days',
        b: '300 days',
        c: '380 days',
        d: '365 days',
        correct: 'd',
    },

    {
        question: 'On what day is Halloween celebrated?',
        a: 'October 31st',
        b: 'October 24th',
        c: 'November 1st',
        d: 'October 1st',
        correct: 'a',
    },

    {
        question: "When is Valentine's Day?",
        a: 'February 19th',
        b: 'February 14th',
        c: 'February 1st',
        d: 'February 28th',
        correct: 'b',

    },
];


//start page
startQuiz.addEventListener('click', start);


    function start() {
    quiz.style.display = 'none';
    gameoverEl.style.display = 'none';
    highscoreContainer.style.display = 'none';
    }



//generate the quiz
let finalQuestionIndex = quizData.length;
let currentQuiz = 0;
let timeLeft = 13;
let timerInterval;
let score = 0;


//the timer
timerInterval = setInterval(function()  {
    timeLeft--;
    timer.textContent = 'Time Left:' + timeLeft;

    if(timeLeft === 0) {
        clearInterval(timerInterval);
        showScore();
    }
}, 1000);

quiz.style.display = 'block';


//start of quiz

function loadQuiz(){
    
    gameoverEl.style.display = 'none';
    highscoreContainer.style.display = 'none';
    startQuiz.style.display = 'none';

    if (currentQuiz === finalQuestionIndex){
        return score();
    }

    const finaldata = quizData[currentQuiz]

    questionEl.innerHTML = finaldata.question
    a_text.innerHTML = finaldata.a;
    b_text.innerHTML = finaldata.b;
    c_text.innerHTML = finaldata.c;
    d_text.innerHTML = finaldata.d;
}

loadQuiz();



function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
    let answer
    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    if(answer) {
        if(answer === quizData[currentQuiz].correct) {
            score++;
        }
        
        currentQuiz++;

        if(currentQuiz < quizData.length) {
            loadQuiz()
        } else {
            finalScoreEl.innerHTML = 'You got' + score + 'out of' + quizData.length + 'correct!';
        }
    }
})

//final score and save initials

function showScore() {
    quiz.style.display = 'none';
    startQuiz.style.display ='none';
    gameoverEl.style.display = 'flex';
    clearInterval(timerInterval);
    highscoreInputName.value = '';
    
}


submitScoreBtn.addEventListener('click', function highscore() {

    if(highscoreInputName.value === "") {
        alert('Initials cannot be blank');
        return false;
    } else {
        let savedHighscores = JSON.parse(localStorage.getItem('savedHighscores')) || [];
        let currentUser = highscoreInputName.value.trim();
        let currentHighscore = {
            name: currentUser,
            score: score
        };


        gameoverEl.style.display='none';
        highscoreContainer.style.display='flex';
        highscoreDiv.style.display='block';
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem('savedHighscores', JSON.stringify(savedHighscores));
    
    }
});


function showHighscore() {
    startQuiz.style.display ='none';
    gameoverEl.style.display ='none';
    highscoreContainer.style.display ='none';
    
}




//*GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score