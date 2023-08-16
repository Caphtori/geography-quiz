let rootEl = document.querySelector('#root');
let statusBar = document.querySelector("#status-bar");
let timerEl = document.querySelector('#timer');
let difficultyEl = document.querySelector('#difficulty');
let scoreEl = document.querySelector('#score');
let headerEl = document.querySelector('#qcard-title');
let quizboxEL = document.querySelector('#quizbox');

let screen = 'start';

let quizTime = 0;
let quizDiff = "";
let quizScore = 0;

timerEl.textContent = quizTime;
difficultyEl.textContent = quizDiff;
scoreEl.textContent = quizScore;

// timerEl.textContent(quizTime);
// difficultyEl.textContent(quizDiff);
// scoreEl.textContent(quizScore);
function capitalize(str, n){
    let newStr = '';
    let char = '';
    for (let i=0; i<str.length; i++){
        if (i===n){
            char=str[i].toUpperCase();
        } else {
            char=str[i]
        };
        newStr = newStr+char;
    }
    return newStr;
};

// Start Screen Functions
function renderStart(){
    let sectionClasses =[mode, diffLevel, startBtn];
    for (let i=0; i<sectionClasses.length; i++){
        let section = document.createElement('section');
        section.setAttribute("class", "starter-section");
        sectionClasses[i].rndr(section);
        quizboxEL.appendChild(section);
    };

    headerEl.textContent = "New Game";
};

// function init(){
//     renderStart();
// };
function startGame(){
    quizboxEL.innerHTML = '';
};

function startGameCl(event){
    let element = event.target;
    if (element.matches(".startBtn") === true) {
        statusBar.setAttribute("style", "visibility: visible;");
        quizTime = 60;
        timerEl.textContent = quizTime;
        startGame();
    }
};

// Start
// init();
renderStart();

if (screen==="start"){
    quizboxEL.addEventListener("click", startGameCl);
};